import prisma from "@/prisma/client"
import Link from "next/link"
import React from "react"

const Tekstovi = async () => {
  const tekstovi = await prisma.tekst.findMany()
  return (
    <div className="admin-page">
      <Link href={`/admin/price/novi`} className="btn">
        Dodaj novu priču
      </Link>
      <ul className="spisak">
        <li>Priče:</li>
        {tekstovi.map((tekst) => (
          <li key={tekst.id}>
            <Link href={`/admin/price/${tekst.id}`}>{tekst.naslov}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const dynamic = "force-dynamic"

export default Tekstovi
