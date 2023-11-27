import NavBar from "./components/NavBar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin">
      <NavBar />
      <main>{children}</main>
    </div>
  )
}
