"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const AdminNavBarItem = ({ href, title }: { href: string; title: string }) => {
  const pathname = usePathname()
  return (
    <li>
      <Link
        className={`link ${pathname === href ? "font-extrabold" : ""}`}
        href={href}
      >
        {title}
      </Link>
    </li>
  )
}

export default AdminNavBarItem
