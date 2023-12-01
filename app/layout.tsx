import type { Metadata } from "next"
import { Source_Sans_3 } from "next/font/google"
import "./globals.css"
import Header from "./Header"
import Footer from "./Footer"

const source = Source_Sans_3({
  subsets: ["latin"],
  variable: "--custom-font-source",
})

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
        <Footer />
      </body>
    </html>
  )
}
