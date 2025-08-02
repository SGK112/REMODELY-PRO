import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      userType: 'CUSTOMER' | 'CONTRACTOR' | 'ADMIN'
      contractor?: any
      customer?: any
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    userType: 'CUSTOMER' | 'CONTRACTOR' | 'ADMIN'
    contractor?: any
    customer?: any
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userType: 'CUSTOMER' | 'CONTRACTOR' | 'ADMIN'
    contractor?: any
    customer?: any
  }
}
