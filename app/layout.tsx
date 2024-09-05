import "./globals.css"

import { Analytics } from "@vercel/analytics/react"
import Footer from "@/components/footer"
import Header from "@/components/header"
import type { Metadata } from "next"
import { Source_Sans_3 } from "next/font/google"

const source = Source_Sans_3({
  subsets: ["latin"],
  variable: "--custom-font-source",
  display: "swap",
  adjustFontFallback: false,
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
    images: "https://marijanacanak.com/slike/marijana-canak.jpg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${source.className} max-w-7xl px-6 xl:mx-auto text-slate-900`}
      >
        <Header />
        <main className="h-full min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
