import KnjigaKartica from "@/app/knjige/components/KnjigaKartica"
import prisma from "@/prisma/client"
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

export default Knjige
