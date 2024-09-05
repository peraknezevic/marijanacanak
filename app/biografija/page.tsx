import Article from "@/components/article"
import H1 from "@/components/h1"
import Image from "next/image"
import { Metadata } from "next"
import React from "react"
import ReactMarkdown from "react-markdown"
import { getBio } from "@/lib/data"
import { notFound } from "next/navigation"

const Biografija = async () => {
  const bio = await getBio()

  if (!bio) return notFound()

  return (
    <>
      <H1 title="Biografija" />
      <Article>
        <figure>
          <Image
            src="/slike/marijana-canak.jpg"
            alt="Marijana Čanak"
            width={1600}
            height={1100}
          />
          <figcaption>
            <p>Marijana Čanak, autorka fotografije Maja Tomić</p>
          </figcaption>
        </figure>
        <ReactMarkdown>{bio?.uvod}</ReactMarkdown>
        <ReactMarkdown>{bio?.tekst}</ReactMarkdown>
      </Article>
    </>
  )
}

export const metadata: Metadata = {
  title: "Biografija književnice Marijane Čanak",
  description: "Biografija književnice Marijane Čanak",
  keywords: [
    "Marijana Čanak",
    "Marijana Čanak biografija",
    "Marijana Čanak autorka biografija",
  ],
  openGraph: {
    title: "Biografija književnice Marijane Čanak",
    description: "Biografija književnice Marijane Čanak",
    images: "https://www.marijanacanak.com/slike/marijana-canak.jpg",
  },
}

export default Biografija
