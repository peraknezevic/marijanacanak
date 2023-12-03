import prisma from "@/prisma/client"
import React from "react"
import TekstKarta from "./components/TekstKarta"
import { Metadata } from "next"

const Tekstovi = async () => {
  const tekstovi = await prisma.tekst.findMany({
    where: {
      status: "Objavljeno",
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  return (
    <div>
      <h1>Priče</h1>
      <ul>
        {tekstovi.map((tekst) => (
          <TekstKarta tekst={tekst} key={tekst.id} />
        ))}
      </ul>
    </div>
  )
}

export const metadata: Metadata = {
  title: "Priče Marijane Čanak",
  description: "Priče Marijane Čanak",
  keywords: ["Marijana Čanak", "Marijana Čanak priče"],
  openGraph: {
    title: "Priče Marijane Čanak",
    description: "Priče Marijane Čanak",
    images: "/slike/marijana-canak.jpg",
  },
}

export default Tekstovi
