import React from "react"
import Link from "next/link"
import { FaGoodreads } from "react-icons/fa"
import { Cutive_Mono, Kaushan_Script } from "next/font/google"

const cutivo = Cutive_Mono({ weight: ["400"], subsets: ["latin"] })
const kaushan = Kaushan_Script({ weight: ["400"], subsets: ["latin"] })

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link href="/" className={`${kaushan.className} text-slate-500`}>
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
            <a href="https://www.goodreads.com/author/show/8286470.Marijana_anak">
              <FaGoodreads />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
