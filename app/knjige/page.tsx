import KnjigaKartica from "@/components/KnjigaKartica"
import prisma from "@/prisma/client"
import React from "react"

const Knjige = async () => {
  const knjige = await prisma.knjiga.findMany()

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

export default Knjige
