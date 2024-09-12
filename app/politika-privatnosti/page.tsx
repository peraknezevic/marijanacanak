import Article from "@/components/frontend/article"
import H1 from "@/components/ui/h1"
import { Metadata } from "next"
import ReactMarkdown from "react-markdown"
import { getPageBySlug } from "@/lib/data"
import { notFound } from "next/navigation"

const PP = async () => {
  const pp = await getPageBySlug("politika-privatnosti")

  if (!pp) return notFound()

  return (
    <>
      <H1 title="Politika Privatnosti" />
      <Article>
        <ReactMarkdown>{pp?.uvod}</ReactMarkdown>
        <ReactMarkdown>{pp?.tekst}</ReactMarkdown>
      </Article>
    </>
  )
}

export const metadata: Metadata = {
  title: "Politika privatnosti sajta Marijane Čanak",
  description: "Politika privatnosti sajta Marijane Čanak",
  keywords: ["Marijana Čanak"],
  openGraph: {
    title: "Politika privatnosti sajta Marijane Čanak",
    description: "Politika privatnosti sajta Marijane Čanak",
    images: "https://www.marijanacanak.com/slike/marijana-canak.jpg",
  },
}

export default PP
