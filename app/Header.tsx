import React from "react"
import Link from "next/link"
import { FaGoodreads, FaInstagramSquare, FaPatreon } from "react-icons/fa"
import { Bodoni_Moda } from "next/font/google"

const bodoni = Bodoni_Moda({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--custom-font-bodoni",
})

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link
          href="/"
          className={`${bodoni.className} text-slate-500 uppercase`}
        >
          Marijana Čanak
        </Link>
      </div>
      <nav>
        <ul className="main-nav">
          <li>
            <Link href="/novosti">Novosti</Link>
          </li>
          <li>
            <Link href="/knjige">Knjige</Link>
          </li>
          <li>
            <Link href="/price">Priče</Link>
          </li>
          <li>
            <Link href="/biografija">Biografija</Link>
          </li>
          <li>
            <Link href="/press">Press</Link>
          </li>
          <li>
            <Link href="/kontakt">Kontakt</Link>
          </li>

          <li>
            <a
              href="httpshttps://www.patreon.com/MarijanaCanak"
              title="Marijana na Patreonu"
            >
              <FaPatreon className="-mb-1" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/canakmarijana/"
              title="Marijana na Instagramu"
            >
              <FaInstagramSquare className="-mb-1" />
            </a>
          </li>
          <li>
            <a
              href="https://www.goodreads.com/author/show/8286470.Marijana_anak"
              title="Marijana na GoodReads"
            >
              <FaGoodreads className="-mb-1" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
