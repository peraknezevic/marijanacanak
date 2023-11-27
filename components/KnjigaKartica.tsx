import { Knjiga } from "@prisma/client"
import React from "react"
import Image from "next/image"

const KnjigaKartica = ({ knjiga }: { knjiga: Knjiga }) => {
  return (
    <li>
      <div className="knjiga">
        <div className="knjiga-slika">
          <Image
            src={`/slike/knjige/${knjiga.slug}.jpg`}
            width={400}
            height={500}
            alt={knjiga.naziv}
          />
          {knjiga.kupovina && (
            <p>
              <a href={knjiga.kupovina} className="btn">
                Naruči knjigu
              </a>
            </p>
          )}
        </div>
        <div className="knjiga-info">
          <h2 className="knjiga-naslov">{knjiga.naziv}</h2>
          {knjiga.zanr && (
            <p>
              <span>Žanr:</span> {knjiga.zanr}
            </p>
          )}
          {knjiga.zaIzdavaca && (
            <p>
              <span>Za izdavača:</span> {knjiga.zaIzdavaca}
            </p>
          )}
          {knjiga.urednik && (
            <p>
              <span>Urednik:</span> {knjiga.urednik}
            </p>
          )}
          {knjiga.prevod && (
            <p>
              <span>Prevod:</span> {knjiga.prevod}
            </p>
          )}
          {knjiga.lektura && (
            <p>
              <span>Lektura i korektura:</span> {knjiga.lektura}
            </p>
          )}
          {knjiga.prelom && (
            <p>
              <span>Prelom i dizajn:</span> {knjiga.prelom}
            </p>
          )}
          {knjiga.dizajnNaslovnice && (
            <p>
              <span>Ilustracija:</span> {knjiga.dizajnNaslovnice}
            </p>
          )}
          {knjiga.stampa && (
            <p>
              <span>Štampa:</span> {knjiga.stampa}
            </p>
          )}
          {knjiga.obim && (
            <p>
              <span>Obim:</span> {knjiga.obim}
            </p>
          )}
          {knjiga.isbn && (
            <p>
              <span>ISBN:</span> {knjiga.isbn}
            </p>
          )}
          {knjiga.izdavac && (
            <p>
              <span>Izdavač:</span> {knjiga.izdavac}
            </p>
          )}
          {knjiga.godina && (
            <p>
              <span>Godina izdanja:</span> {knjiga.godina}
            </p>
          )}
        </div>
      </div>
    </li>
  )
}

export default KnjigaKartica
