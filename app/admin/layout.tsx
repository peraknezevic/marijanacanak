import NavBar from "./components/NavBar"
import { auth } from "@/auth"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  const username = session?.user?.name
  return (
    <div className="admin">
      <NavBar username={username} />
      <main>{children}</main>
    </div>
  )
}
