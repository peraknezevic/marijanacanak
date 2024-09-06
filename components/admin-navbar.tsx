import AdminNavBarItem from "./admin-navbar-item"
import H1 from "./h1"
import SignOutButton from "@/components/sign-out-button"
import { auth } from "@/auth"

const AdminNavBar = async () => {
  const session = await auth()

  return (
    <>
      <H1 title="Admin Panel" />
      <nav className="bg-zinc-200 px-4">
        <ul className="flex justify-around">
          {session?.user?.role === "admin" && (
            <>
              <AdminNavBarItem href="/admin" title="Novosti" />
              <AdminNavBarItem href="/admin/price" title="Priče" />
              <AdminNavBarItem href="/admin/knjige" title="Knjige" />
              <AdminNavBarItem href="/admin/stranice" title="Stranice" />
              <AdminNavBarItem href="/admin/press" title="Press" />
            </>
          )}

          <li className="flex ml-auto">
            <div className="my-4 py-1 px-4 text-sm uppercase font-bold">
              {session?.user?.name}
            </div>
            <SignOutButton />
          </li>
        </ul>
      </nav>
    </>
  )
}

export default AdminNavBar
