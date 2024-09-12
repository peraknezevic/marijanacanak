import { auth } from "@/auth"

const AdminPage = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()

  if (session?.user?.role !== "admin")
    return (
      <div className="bg-zinc-100 p-8 flex min-h-[50vh] items-center justify-center">
        <p className="text-center text-2xl">
          You must have admin rights to access this page
        </p>
      </div>
    )

  return (
    <div className="bg-zinc-100 p-8 flex flex-col gap-8 min-h-[50vh]">
      {children}
    </div>
  )
}

export default AdminPage
