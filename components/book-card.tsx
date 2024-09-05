import BookInfoItem from "./book-info-item"
import Image from "next/image"
import { Knjiga } from "@prisma/client"
import Link from "next/link"
import LinkBtn from "./link-btn"
import ReactMarkdown from "react-markdown"

const BookCard = ({ book }: { book: Knjiga }) => {
  return (
    <li className="flex flex-col mt-4 xl:mt-8 mb-16 lg:mb-32 gap-2 lg:gap-16 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 xl:gap-16">
        <div className="flex flex-col gap-4 lg:gap-8">
          <Image
            className="shadow-2xl border-2 border-zinc-400 mx-auto"
            src={`/slike/knjige/${book.slug}.jpg`}
            width={400}
            height={500}
            alt={book.naziv}
          />
        </div>
        <div className="lg:px-6 py-4 lg:py-10 items-center text-xl leading-8">
          <h2 className="uppercase">
            <Link href={`knjige/${book.slug}`}>{book.naziv}</Link>
          </h2>

          {book.izdavac && <BookInfoItem title="Izdavač" info={book.izdavac} />}
          {book.zanr && <BookInfoItem title="Žanr" info={book.zanr} />}
          {book.godina && (
            <BookInfoItem title="Godina izdanja" info={book.godina} />
          )}
          <BookInfoItem>
            <LinkBtn
              href={`knjige/${book.slug}`}
              title="više o ovom izdanju"
              type="regular"
            />
          </BookInfoItem>
          {book.kupovina && (
            <BookInfoItem>
              <LinkBtn
                href={book.kupovina}
                title="naruči knjigu"
                type="regular"
                external
              />
            </BookInfoItem>
          )}
        </div>
      </div>
      <div className="[&>p]:text-left [&>p]:text-xl [&>p]:mb-4">
        {book.sazetak && <ReactMarkdown>{book.sazetak}</ReactMarkdown>}
      </div>
    </li>
  )
}

export default BookCard
