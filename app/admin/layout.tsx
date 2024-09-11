import AdminNavBar from "../../components/admin-navbar"
import AdminPage from "@/components/admin-page"
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
    <div className="max-w-4xl mx-auto my-16 min-h-full">
      <AdminNavBar />
      <AdminPage>{children}</AdminPage>
    </div>
  )
}
