import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { TwoFactorAuth } from "@/lib/two-factor-auth"

// UserType is not exported from @prisma/client; define it as a string union type
type UserType = "CUSTOMER" | "CONTRACTOR" | "ADMIN";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        userType: { label: "User Type", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: {
              contractor: true,
              customer: true
            }
          })

          if (!user || !user.password) {
            return null
          }

          const isValidPassword = await TwoFactorAuth.verifyPassword(credentials.password, user.password)

          if (!isValidPassword) {
            return null
          }

          return {
            id: user.id,
            email: user.email || '',
            name: user.name || '',
            userType: user.userType,
            contractor: user.contractor,
            customer: user.customer
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle Google OAuth sign-in
      if (account?.provider === "google") {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          });

          if (!existingUser) {
            // Create new user with Google OAuth
            const newUser = await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name || "",
                userType: "CUSTOMER", // Default to customer for Google sign-ins
                emailVerified: new Date()
              }
            });

            // Create customer profile
            await prisma.customer.create({
              data: {
                userId: newUser.id,
                firstName: user.name?.split(' ')[0] || "",
                lastName: user.name?.split(' ')[1] || "",
                phone: ""
              }
            });
          }
          
          return true;
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.userType = user.userType
        token.contractor = user.contractor
        token.customer = user.customer
      }

      // Fetch fresh user data for Google OAuth users
      if (account?.provider === "google" && token.email) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email },
            include: {
              contractor: true,
              customer: true
            }
          });
          
          if (dbUser) {
            token.userType = dbUser.userType;
            token.contractor = dbUser.contractor;
            token.customer = dbUser.customer;
          }
        } catch (error) {
          console.error("JWT callback error:", error);
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.userType = token.userType as UserType
        session.user.contractor = token.contractor
        session.user.customer = token.customer
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
