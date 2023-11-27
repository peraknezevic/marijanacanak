import { Tekst } from "@prisma/client"
import Link from "next/link"
import React from "react"

const TekstKarta = ({ tekst }: { tekst: Tekst }) => {
  return (
    <li className="list-none">
      <h2>
        <Link href={`/tekstovi/${tekst.slug}`}>{tekst.naslov}</Link>
      </h2>
      {tekst.uvod && <p>{tekst.uvod}</p>}
      {tekst.patreonLink && (
        <a href={tekst.patreonLink}>Pročitajte na Patreonu</a>
      )}
      {tekst.spoljniLink && (
        <a href={tekst.spoljniLink}>Ceo tekst na {tekst.nazivSpoljnogLinka}</a>
      )}
    </li>
  )
}

export default TekstKarta
