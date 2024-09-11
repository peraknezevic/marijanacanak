import AdminList from "@/components/admin-list"
import Button from "@/components/button"
import { getPages } from "@/lib/data"

const Page = async () => {
  const pages = await getPages()

  return (
    <>
      <Button
        href="/admin/stranice/nova"
        title="Dodaj novu stranicu"
        type="regular"
      />
      <AdminList list={pages} href="stranice" />
    </>
  )
}

export const dynamic = "force-dynamic"

export default Page
