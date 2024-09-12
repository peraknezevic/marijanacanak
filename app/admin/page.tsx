import AdminList from "@/components/admin/admin-list"
import Button from "@/components/ui/button"
import { getNews } from "@/lib/data"

const Page = async () => {
  const news = await getNews()
  return (
    <>
      <Button href="/admin/novosti/nova" title="Dodaj novost" type="regular" />
      <AdminList list={news} href="novosti" />
    </>
  )
}

export default Page
