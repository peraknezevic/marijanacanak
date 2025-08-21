import BookPage from "@/components/frontend/book-page"
import { getBookBySlug } from "@/lib/data"
import { notFound } from "next/navigation"

const Knjiga = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const book = await getBookBySlug(slug)

  if (!book) return notFound()

  return <BookPage book={book} />
}

export default Knjiga
