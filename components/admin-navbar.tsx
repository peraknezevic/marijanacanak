import AdminNavBarItem from "./admin-navbar-item"
import SignInButton from "@/components/sign-in-button"
import SignOutButton from "@/components/sign-out-button"
import { auth } from "@/auth"

const AdminNavBar = async () => {
  const session = await auth()

  return (
    <>
      <h1>Admin Panel</h1>
      <nav className="bg-zinc-200 text-xl py-4 px-4">
        <ul className="flex gap-4">
          {session?.user?.role === "admin" && (
            <>
              <AdminNavBarItem href="/admin/novosti" title="Novosti" />
              <AdminNavBarItem href="/admin/price" title="Priče" />
              <AdminNavBarItem href="/admin/knjige" title="Knjige" />
              <AdminNavBarItem href="/admin/stranice" title="Stranice" />
              <AdminNavBarItem href="/admin/press" title="Press" />
              <AdminNavBarItem href="/admin/novosti" title="Novosti" />
              <li className="flex gap-4 grow text-right">
                <p>Korisnik: {session?.user?.name}</p> <SignOutButton />
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  )
}

export default AdminNavBar
