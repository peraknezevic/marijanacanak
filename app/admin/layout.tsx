import NavBar from "./components/NavBar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <NavBar />
      <main id="admin">{children}</main>
    </div>
  )
}
