import AdminList from "@/components/admin-list"
import Button from "@/components/button"
import { getPress } from "@/lib/data"

const Page = async () => {
  const press = await getPress()

  return (
    <>
      <Button
        href="/admin/press/novi"
        title="Dodaj novi press"
        type="regular"
      />
      <AdminList list={press} href="press" />
    </>
  )
}

export const dynamic = "force-dynamic"

export default Page
