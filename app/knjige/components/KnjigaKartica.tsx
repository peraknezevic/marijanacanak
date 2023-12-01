import { Knjiga } from "@prisma/client"
import React from "react"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import Link from "next/link"

const KnjigaKartica = ({ knjiga }: { knjiga: Knjiga }) => {
  return (
    <li className="knjiga">
      <div className="knjiga-header">
        <div className="knjiga-slika">
          <Image
            src={`/slike/knjige/${knjiga.slug}.jpg`}
            width={400}
            height={500}
            alt={knjiga.naziv}
          />
        </div>
        <div className="knjiga-info">
          <h2 className="knjiga-naslov">
            <Link href={`knjige/${knjiga.slug}`}>{knjiga.naziv}</Link>
          </h2>

          {knjiga.izdavac && (
            <p>
              <span>Izdavač:</span> {knjiga.izdavac}
            </p>
          )}
          {knjiga.zanr && (
            <p>
              <span>Žanr:</span> {knjiga.zanr}
            </p>
          )}
          {knjiga.godina && (
            <p>
              <span>Godina izdanja:</span> {knjiga.godina}.
            </p>
          )}
          <Link className="btn text-lg" href={`knjige/${knjiga.slug}`}>
            više o ovom izdanju
          </Link>
          {knjiga.kupovina && (
            <p>
              <a href={knjiga.kupovina} className="btn">
                naruči knjigu
              </a>
            </p>
          )}
        </div>
      </div>
      <div className="knjiga-opis">
        {knjiga.sazetak && <ReactMarkdown>{knjiga.sazetak}</ReactMarkdown>}
      </div>
    </li>
  )
}

export default KnjigaKartica
