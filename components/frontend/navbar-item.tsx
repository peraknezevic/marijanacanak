"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const NavBarItem = ({ href, title }: { href: string; title: string }) => {
  const pathname = usePathname()
  return (
    <li>
      <Link
        href={href}
        className={`no-underline font-bold tracking-wider ${
          pathname === href ? "opacity-60" : ""
        }`}
      >
        {title}
      </Link>
    </li>
  )
}

export default NavBarItem
