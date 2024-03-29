import prisma from "@/prisma/client"
import Link from "next/link"
import React from "react"

const Knjige = async () => {
  const knjige = await prisma.knjiga.findMany({
    orderBy: {
      godina: "desc",
    },
  })
  return (
    <div className="admin-page">
      <Link href={`/admin/knjige/nova`} className="btn">
        Dodaj novu knjigu
      </Link>
      <ul className="spisak">
        <li>Knjige:</li>
        {knjige.map((knjiga) => (
          <li key={knjiga.id}>
            <Link href={`/admin/knjige/${knjiga.id}`}>
              {knjiga.naziv}
              <span>{knjiga.slug}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const dynamic = "force-dynamic"

export default Knjige
