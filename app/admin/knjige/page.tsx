import { getBooks, getNews } from "@/lib/data"

import AdminList from "@/components/admin-list"
import Button from "@/components/button"

const Knjige = async () => {
  const books = await getBooks()
  return (
    <>
      <Button href={`/admin/knjige/nova`} title="Dodaj knjigu" type="regular" />
      <AdminList list={books} href="knjige" />
    </>
  )
}

export const dynamic = "force-dynamic"

export default Knjige
