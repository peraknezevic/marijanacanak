"use client"

import Button from "../ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const AdminNavBarItem = ({ href, title }: { href: string; title: string }) => {
  const pathname = usePathname()
  return (
    <li>
      <Button
        href={href}
        title={title}
        type="small"
        active={pathname === href}
      />
    </li>
  )
}

export default AdminNavBarItem
