import prisma from "@/prisma/client"
import Link from "next/link"
import React from "react"

const Tekstovi = async () => {
  const tekstovi = await prisma.tekst.findMany()
  return (
    <div>
      <h1>Tekstovi</h1>
      <Link href={`/admin/tekstovi/novi`} className="btn">
        Dodaj tekst
      </Link>
      <ul>
        {tekstovi.map((tekst) => (
          <li key={tekst.id}>
            <Link href={`/admin/tekstovi/${tekst.slug}`}>{tekst.naslov}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tekstovi
