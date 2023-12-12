import KnjigaKartica from "@/app/knjige/components/KnjigaKartica"
import prisma from "@/prisma/client"
import { Metadata } from "next"
import React from "react"

const Knjige = async () => {
  const knjige = await prisma.knjiga.findMany({
    orderBy: {
      godina: "desc",
    },
  })

  return (
    <>
      <h1>Knjige</h1>
      <ul>
        {knjige.map((knjiga) => (
          <KnjigaKartica knjiga={knjiga} key={knjiga.id} />
        ))}
      </ul>
    </>
  )
}

export const metadata: Metadata = {
  title: "Knjige Marijane Čanak",
  description: "Knjige autorke Marijane Čanak",
  openGraph: {
    title: "Marijana Čanak",
    description: "Knjige autorke Marijane Čanak",
    images: "https://www.marijanacanak.com/slike/marijana-canak-knjige.jpg",
  },
}

export default Knjige
