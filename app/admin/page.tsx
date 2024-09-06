import AdminList from "@/components/admin-list"
import AdminPage from "@/components/admin-page"
import Button from "@/components/button"
import H2 from "@/components/h2"
import { getNews } from "@/lib/data"

const Admin = async () => {
  const news = await getNews()
  return (
    <>
      <Button
        href={`/admin/novosti/nova`}
        title="Dodaj novost"
        type="regular"
      />
      <AdminList list={news} href="novosti" title="Novosti" />
    </>
  )
}

export default Admin
