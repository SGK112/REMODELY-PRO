import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { TwoFactorAuth } from "@/lib/two-factor-auth"

// UserType is not exported from @prisma/client; define it as a string union type
type UserType = "CUSTOMER" | "CONTRACTOR" | "ADMIN";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        userType: { label: "User Type", type: "text" },
        twoFactorCode: { label: "2FA Code", type: "text" },
        backupCode: { label: "Backup Code", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: {
              contractor: true,
              customer: true
            }
          })

          if (!user) {
            throw new Error("No user found with this email")
          }

          if (!user.password) {
            throw new Error("User password is missing")
          }

          const isValidPassword = await TwoFactorAuth.verifyPassword(credentials.password, user.password)

          if (!isValidPassword) {
            throw new Error("Invalid password")
          }

          // Check if 2FA is enabled
          if (user.twoFactorEnabled && user.twoFactorSecret) {
            if (!credentials.twoFactorCode && !credentials.backupCode) {
              throw new Error("2FA_REQUIRED")
            }

            let isValid2FA = false;

            // Check TOTP code
            if (credentials.twoFactorCode) {
              isValid2FA = TwoFactorAuth.verifyToken(user.twoFactorSecret, credentials.twoFactorCode)
            }

            // Check backup code if TOTP failed
            if (!isValid2FA && credentials.backupCode && user.backupCodes) {
              const backupCodes = JSON.parse(user.backupCodes)
              isValid2FA = TwoFactorAuth.verifyBackupCode(backupCodes, credentials.backupCode)

              if (isValid2FA) {
                // Remove used backup code
                const updatedCodes = TwoFactorAuth.removeBackupCode(backupCodes, credentials.backupCode)
                await prisma.user.update({
                  where: { id: user.id },
                  data: { backupCodes: JSON.stringify(updatedCodes) }
                })
              }
            }

            if (!isValid2FA) {
              throw new Error("Invalid 2FA code")
            }
          }

          return {
            id: user.id,
            email: user.email || '',
            name: user.name || '',
            userType: user.userType,
            contractor: user.contractor,
            customer: user.customer,
            twoFactorEnabled: user.twoFactorEnabled
          }
        } catch (error) {
          console.error("Auth error:", error)
          if (error instanceof Error && error.message === "2FA_REQUIRED") {
            throw new Error("2FA_REQUIRED")
          }
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.userType = user.userType
        token.contractor = user.contractor
        token.customer = user.customer
        token.twoFactorEnabled = user.twoFactorEnabled
      }

      if (trigger === "update" && session) {
        token = { ...token, ...session }
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.userType = token.userType as UserType
        session.user.contractor = token.contractor
        session.user.customer = token.customer
        session.user.twoFactorEnabled = token.twoFactorEnabled
      }
      return session
    }
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}
