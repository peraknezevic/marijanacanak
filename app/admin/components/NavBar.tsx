import Link from "next/link"
import React from "react"

const NavBar = () => {
  return (
    <nav className="admin-nav">
      <ul>
        <li>Admin</li>
        <li>
          <Link href="/admin/novosti">Novosti</Link>
        </li>
        <li>
          <Link href="/admin/price">Priče</Link>
        </li>
        <li>
          <Link href="/admin/knjige">Knjige</Link>
        </li>
        <li>
          <Link href="/admin/stranice">Stranice</Link>
        </li>
        <li>
          <Link href="/admin/press">Press</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
