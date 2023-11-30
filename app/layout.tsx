import type { Metadata } from "next"
import { Sofia_Sans, Source_Sans_3 } from "next/font/google"
import "./globals.css"
import Header from "../components/Header"

const sofia = Sofia_Sans({ subsets: ["latin"] })
const source = Source_Sans_3({ subsets: ["latin"] })

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
      <body className={source.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
