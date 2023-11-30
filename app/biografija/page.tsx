import prisma from "@/prisma/client"
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
    <article>
      <h1>Biografija</h1>
      <div className="prose lg:prose-xl mx-auto">
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
      </div>
    </article>
  )
}

export default Biografija
