import prisma from "@/prisma/client"
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
        <ReactMarkdown>{biografija?.uvod}</ReactMarkdown>
        <ReactMarkdown>{biografija?.tekst}</ReactMarkdown>
      </div>
    </article>
  )
}

export default Biografija
