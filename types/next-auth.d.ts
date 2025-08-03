import { UserType } from "@prisma/client"
import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      userType: UserType
      contractor?: any
      customer?: any
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    userType: UserType
    contractor?: any
    customer?: any
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userType: UserType
    contractor?: any
    customer?: any
  }
}
