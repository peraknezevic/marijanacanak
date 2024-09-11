import AdminList from "@/components/admin-list"
import AdminPage from "@/components/admin-page"
import Button from "@/components/button"
import { getNews } from "@/lib/data"

const Page = async () => {
  const news = await getNews()
  return (
    <AdminPage>
      <Button href="/admin/novosti/nova" title="Dodaj novost" type="regular" />
      <AdminList list={news} href="novosti" />
    </AdminPage>
  )
}

export default Page
