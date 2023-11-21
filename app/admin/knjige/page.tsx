import prisma from "@/prisma/client"
import Link from "next/link"
import React from "react"

const Knjige = async () => {
  const knjige = await prisma.knjiga.findMany()
  return (
    <div>
      <h1>Knjige</h1>
      <Link href={`/admin/knjige/nova`} className="btn">
        Dodaj knjigu
      </Link>
      <ul>
        {knjige.map((knjiga) => (
          <li key={knjiga.id}>
            <Link href={`/admin/knjige/${knjiga.slug}`}>{knjiga.naziv}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Knjige
