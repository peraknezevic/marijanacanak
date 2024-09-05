import Google from "next-auth/providers/google"
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/prisma/client"

export const { auth, handlers, signIn, signOut } = NextAuth({
  theme: {
    logo: "/login-logo.svg",
  },
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  },
})
