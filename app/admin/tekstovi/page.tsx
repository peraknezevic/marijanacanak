import prisma from "@/prisma/client"
import Link from "next/link"
import React from "react"

const Tekstovi = async () => {
  const tekstovi = await prisma.tekst.findMany()
  return (
    <div className="admin-page">
      <Link href={`/admin/tekstovi/novi`} className="btn">
        Dodaj novi tekst
      </Link>
      <ul className="spisak">
        <li>Tekstovi:</li>
        {tekstovi.map((tekst) => (
          <li key={tekst.id}>
            <Link href={`/admin/tekstovi/${tekst.id}`}>{tekst.naslov}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tekstovi
