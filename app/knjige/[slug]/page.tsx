import BookPage from "@/components/book-page"
import { getBookBySlug } from "@/lib/data"
import { notFound } from "next/navigation"

const Knjiga = async ({ params }: { params: { slug: string } }) => {
  const book = await getBookBySlug(params.slug)

  if (!book) return notFound()

  return <BookPage book={book} />
}

export default Knjiga
