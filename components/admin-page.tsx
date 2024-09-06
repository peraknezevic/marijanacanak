import { auth } from "@/auth"

const AdminPage = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()

  if (session?.user?.role !== "admin")
    return (
      <div className="p-8 flex flex-col gap-8">
        <p>You must have admin rights to access this page</p>
      </div>
    )

  return <div className="bg-zinc-100 p-8 flex flex-col gap-8">{children}</div>
}

export default AdminPage
