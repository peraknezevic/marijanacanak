import prisma from "@/prisma/client"
import Link from "next/link"
import React from "react"
import ReactMarkdown from "react-markdown"

const Press = async () => {
  const press = await prisma.press.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
  return (
    <>
      <h1>Press</h1>
      <ul>
        {press.map((item) => (
          <li key={item.id} className="prose lg:prose-xl mx-auto mb-24">
            <h3>
              <Link href={item.link}>{item.naslov}</Link>
            </h3>
            <ReactMarkdown className="text-left">{item.opis}</ReactMarkdown>
            <hr />
          </li>
        ))}
      </ul>
    </>
  )
}

export default Press
