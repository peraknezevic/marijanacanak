import AdminList from "@/components/admin-list"
import AdminPage from "@/components/admin-page"
import Button from "@/components/button"
import Link from "next/link"
import { getNews } from "@/lib/data"

const Novosti = async () => {
  const news = await getNews()

  return (
    <AdminPage>
      <Button
        href={`/admin/novosti/nova`}
        title="Dodaj novost"
        type="regular"
      />
      <AdminList list={news} href="novosti" title="Novosti" />
    </AdminPage>
  )
}

export const dynamic = "force-dynamic"

export default Novosti
