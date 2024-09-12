import { Adapter } from "next-auth/adapters"
import Google from "next-auth/providers/google"
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/prisma/client"

export const { auth, handlers, signIn, signOut } = NextAuth({
  theme: {
    logo: "https://ik.imagekit.io/tkrwfvazw/marijanacanak/slike/login-logo.svg",
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [Google],
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role
      return session
    },
    // authorized: async ({ auth }) => {
    //   // Logged in users are authenticated, otherwise redirect to login page
    //   return !!auth
    // },
  },
})
