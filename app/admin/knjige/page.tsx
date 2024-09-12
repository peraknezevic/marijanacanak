import AdminList from "@/components/admin/admin-list"
import Button from "@/components/ui/button"
import { getBooks } from "@/lib/data"

const Page = async () => {
  const books = await getBooks()

  return (
    <>
      <Button
        href="admin/knjige/nova"
        title="Dodaj novu knjigu"
        type="regular"
      />
      <AdminList list={books} href="knjige" />
    </>
  )
}

export const dynamic = "force-dynamic"

export default Page
