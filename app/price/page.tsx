import prisma from "@/prisma/client"
import React from "react"
import TekstKarta from "./components/TekstKarta"

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

export default Tekstovi
