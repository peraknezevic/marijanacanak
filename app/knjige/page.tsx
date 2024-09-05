import BookCard from "@/components/book-card"
import H1 from "@/components/h1"
import { Metadata } from "next"
import { getBooks } from "@/lib/data"

const Knjige = async () => {
  const books = await getBooks()

  return (
    <>
      <H1 title="Knjige" />
      <ul>
        {books.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </ul>
    </>
  )
}

export const metadata: Metadata = {
  title: "Knjige Marijane Čanak",
  description: "Knjige autorke Marijane Čanak",
  openGraph: {
    title: "Marijana Čanak",
    description: "Knjige autorke Marijane Čanak",
    images: "https://www.marijanacanak.com/slike/marijana-canak-knjige.jpg",
  },
}

export default Knjige
