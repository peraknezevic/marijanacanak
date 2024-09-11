import AdminList from "@/components/admin-list"
import AdminPage from "@/components/admin-page"
import Button from "@/components/button"
import { getBooks } from "@/lib/data"

const Page = async () => {
  const books = await getBooks()

  return (
    <AdminPage>
      <Button
        href="admin/knjige/nova"
        title="Dodaj novu knjigu"
        type="regular"
      />
      <AdminList list={books} href="knjige" />
    </AdminPage>
  )
}

export const dynamic = "force-dynamic"

export default Page
