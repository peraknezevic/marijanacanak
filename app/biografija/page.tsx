import prisma from "@/prisma/client"
import { Metadata } from "next"
import Image from "next/image"
import React from "react"
import ReactMarkdown from "react-markdown"

const Biografija = async () => {
  const biografija = await prisma.stranica.findUnique({
    where: {
      slug: "biografija",
    },
  })
  return (
    <>
      <h1>Biografija</h1>
      <article className="prose lg:prose-xl mx-auto">
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
        <ReactMarkdown>{biografija?.uvod}</ReactMarkdown>
        <ReactMarkdown>{biografija?.tekst}</ReactMarkdown>
      </article>
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
