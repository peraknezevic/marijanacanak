import { Tekst } from "@prisma/client"
import Link from "next/link"
import React from "react"
import ReactMarkdown from "react-markdown"

const TekstKarta = ({ tekst }: { tekst: Tekst }) => {
  return (
    <li className="prose lg:prose-xl mx-auto text-left mb-32">
      <h2>
        {(tekst.spoljniLink && (
          <a href={tekst.spoljniLink}>{tekst.naslov}</a>
        )) ||
          (tekst.patreonLink && (
            <a href={tekst.patreonLink}>{tekst.naslov}</a>
          )) || <Link href={`/price/${tekst.slug}`}>{tekst.naslov}</Link>}
      </h2>
      {tekst.uvod && <ReactMarkdown>{tekst.uvod}</ReactMarkdown>}
      {tekst.patreonLink && (
        <a href={tekst.patreonLink} className="btn btn-sm bg-patreon">
          Pročitajte na Patreonu
        </a>
      )}
      {tekst.spoljniLink && (
        <a href={tekst.spoljniLink} className="btn btn-sm">
          Ceo tekst na {tekst.nazivSpoljnogLinka}
        </a>
      )}
    </li>
  )
}

export default TekstKarta
