import React from "react"
import Link from "next/link"

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link href="/">Marijana Čanak</Link>
      </div>
      <nav>
        <ul className="main-nav">
          <li>
            <Link href="/knjige">Knjige</Link>
          </li>
          <li>
            <Link href="/tekstovi">Tekstovi</Link>
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
        </ul>
      </nav>
    </header>
  )
}

export default Header
