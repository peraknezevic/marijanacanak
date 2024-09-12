import AdminNavBarItem from "./admin-navbar-item"
import H1 from "../ui/h1"
import SignOutButton from "@/components/ui/sign-out-button"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

const AdminNavBar = async () => {
  const session = await auth()

  if (!session) redirect("/api/auth/signin?callbackUrl=/admin")

  return (
    <>
      <H1 title="Admin Dashboard" />
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
