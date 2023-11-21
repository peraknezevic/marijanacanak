import Link from "next/link"
import React from "react"

const NavBar = () => {
  return (
    <nav className="bg-zinc-100 text-xl">
      <ul className="flex gap-4">
        <li>Uredi:</li>
        <li>
          <Link href="/admin/knjige">Knjige</Link>
        </li>
        <li>
          <Link href="/admin/tekstovi">Tekstove</Link>
        </li>
        <li>
          <Link href="/stranice">Stranice</Link>
        </li>
        <li>
          <Link href="/press">Press</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
