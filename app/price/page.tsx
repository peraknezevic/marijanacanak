import prisma from "@/prisma/client"
import React from "react"
import TekstKarta from "./components/TekstKarta"

const Tekstovi = async () => {
  const tekstovi = await prisma.tekst.findMany({
    where: {
      status: "Objavljeno",
    },
  })
  return (
    <div>
      <h1>Tekstovi</h1>
      <ul>
        {tekstovi.map((tekst) => (
          <TekstKarta tekst={tekst} key={tekst.id} />
        ))}
      </ul>
    </div>
  )
}

export default Tekstovi
