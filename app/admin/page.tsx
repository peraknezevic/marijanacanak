import AdminList from "@/components/admin-list"
import Button from "@/components/button"
import { getNews } from "@/lib/data"

const Novosti = async () => {
  const news = await getNews()
  return (
    <>
      <Button
        href={`/admin/novosti/nova`}
        title="Dodaj novost"
        type="regular"
      />
      <AdminList list={news} href="novosti" />
    </>
  )
}

export default Novosti
