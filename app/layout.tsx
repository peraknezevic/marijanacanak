import type { Metadata } from "next"
import { Sofia_Sans } from "next/font/google"
import "./globals.css"
import Header from "./components/Header"

const sofia = Sofia_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Marijana Čanak",
  description: "Zvanična prezentacija autorke Marijane Čanak",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${sofia.className} max-w-2xl mx-auto`}>
        <Header />
        <main className="prose">{children}</main>
      </body>
    </html>
  )
}
