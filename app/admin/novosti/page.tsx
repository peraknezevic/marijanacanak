import prisma from "@/prisma/client"
import Link from "next/link"
import React from "react"

const Novosti = async () => {
  const novosti = await prisma.novost.findMany({
    orderBy: { createdAt: "desc" },
  })
  return (
    <div className="admin-page">
      <Link href={`/admin/novosti/nova`} className="btn">
        Dodaj novost
      </Link>
      <ul className="spisak">
        <li>Novosti:</li>
        {novosti.map((novost) => (
          <li key={novost.id}>
            <Link href={`/admin/novosti/${novost.id}`}>{novost.naslov}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const dynamic = "force-dynamic"

export default Novosti
