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
  keywords: [
    "Marijana Čanak",
    "Marijana Čanak književnica",
    "Marijana Čanak autorka",
    "Marijana Čanak knjige",
    "Marijana Čanak priče",
  ],
  openGraph: {
    title: "Marijana Čanak",
    description: "Zvanična prezentacija autorke Marijane Čanak",
    images: "/slike/marijana-canak.jpg",
  },
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
