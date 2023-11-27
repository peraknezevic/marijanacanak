import prisma from "@/prisma/client"
import Link from "next/link"
import React from "react"

const Stranice = async () => {
  const stranice = await prisma.stranica.findMany()

  return (
    <div className="admin-page">
      <Link href={`/admin/stranice/nova`} className="btn">
        Dodaj novu stranicu
      </Link>
      <ul className="spisak">
        <li>Stranice:</li>
        {stranice.map((stranica) => (
          <li key={stranica.id}>
            <Link href={`/admin/stranice/${stranica.id}`}>
              {stranica.naslov}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Stranice
