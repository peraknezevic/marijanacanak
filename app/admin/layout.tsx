import AdminNavBar from "../../components/admin-navbar"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  const user = session?.user

  if (!user) redirect("/api/auth/signin?callbackUrl=/admin")

  return (
    <div className="admin">
      <AdminNavBar />
      {user?.role === "admin" && <p>You are admin</p>}
      {user?.role !== "admin" && <p>You are not admin</p>}
      <main>{children}</main>
    </div>
  )
}
