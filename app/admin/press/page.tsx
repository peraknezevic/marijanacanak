import prisma from "@/prisma/client"
import Link from "next/link"
import React from "react"

const Pressovi = async () => {
  const pressovi = await prisma.press.findMany()
  return (
    <div className="admin-page">
      <Link href={`/admin/press/novi`} className="btn">
        Dodaj novi press
      </Link>
      <ul className="spisak">
        <li>Press sadrzaj:</li>
        {pressovi.map((press) => (
          <li key={press.id}>
            <Link href={`/admin/press/${press.id}`}>{press.naslov}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const dynamic = "force-dynamic"

export default Pressovi
