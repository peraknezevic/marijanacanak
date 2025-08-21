import dynamic from "next/dynamic"
import { getBookById } from "@/lib/data"
import { notFound } from "next/navigation"
import { deleteBook, updateBook } from "@/lib/actions"

const FormBook = dynamic(() => import("@/components/forms/form-book"), {
  ssr: !!false,
})

const EditBookPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const book = await getBookById(id)

  if (!book) notFound()

  return (
    <FormBook
      book={book}
      onSubmitAction={updateBook.bind(null, book.id)}
      onDeleteAction={deleteBook.bind(null, book.id)}
    />
  )
}

export default EditBookPage
