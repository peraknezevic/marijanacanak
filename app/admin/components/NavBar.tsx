import Link from "next/link"

const NavBar = ({ username }: { username: string | null | undefined }) => {
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
        {username && <li>Ulogovani ste kao {username}</li>}
      </ul>
    </nav>
  )
}

export default NavBar
