import dynamic from "next/dynamic"
import { getBookById } from "@/lib/data"
import { notFound } from "next/navigation"

const FormBook = dynamic(() => import("@/components/forms/form-book"), {
  ssr: false,
})

const EditBookPage = async ({ params }: { params: { id: string } }) => {
  const book = await getBookById(params.id)

  if (!book) notFound()

  return <FormBook book={book} />
}

export default EditBookPage
