import AdminList from "@/components/admin-list"
import Button from "@/components/button"
import { getStories } from "@/lib/data"

const Page = async () => {
  const stories = await getStories()

  return (
    <>
      <Button
        href="/admin/price/nova"
        title="Dodaj novu priču"
        type="regular"
      />
      <AdminList list={stories} href="price" />
    </>
  )
}

export const dynamic = "force-dynamic"

export default Page
