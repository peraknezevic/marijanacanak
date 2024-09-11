import AdminList from "@/components/admin-list"
import AdminPage from "@/components/admin-page"
import Button from "@/components/button"
import { getStories } from "@/lib/data"

const Page = async () => {
  const stories = await getStories()

  return (
    <AdminPage>
      <Button
        href="/admin/price/nova"
        title="Dodaj novu priču"
        type="regular"
      />
      <AdminList list={stories} href="price" />
    </AdminPage>
  )
}

export const dynamic = "force-dynamic"

export default Page
