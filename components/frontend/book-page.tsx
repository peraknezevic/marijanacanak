"use client"

import { Knjiga as Book } from "@prisma/client"
import BookDetailsItem from "./book-details-item"
import BookInfoItem from "./book-info-item"
import Button from "../ui/button"
import H1 from "../ui/h1"
import H2 from "../ui/h2"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import { imageKitLoader } from "@/lib/utils"

const BookPage = ({ book }: { book: Book }) => {
  return (
    <div className="flex flex-col mt-4 xl:mt-16 mb-16 lg:mb-32 gap-2 lg:gap-16 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 xl:gap-16">
        <div className="flex flex-col gap-4 lg:gap-8 lg:w-1/2">
          <Image
            className="shadow-2xl border-2 border-zinc-400 mx-auto"
            src={`/marijanacanak/slike/knjige/${book.slug}.jpg`}
            loader={imageKitLoader}
            quality={80}
            width={400}
            height={500}
            alt={book.naslov}
          />
        </div>
        <div className="lg:px-6 py-4 lg:py-10 items-center text-xl leading-8 lg:w-1/2">
          <H1 title={book.naslov} small />

          {book.izdavac && <BookInfoItem title="Izdavač" info={book.izdavac} />}
          {book.zanr && <BookInfoItem title="Žanr" info={book.zanr} />}
          {book.godina && (
            <BookInfoItem title="Godina izdanja" info={book.godina} />
          )}
          {book.kupovina && (
            <BookInfoItem>
              <Button
                href={book.kupovina}
                title="Naruči knjigu"
                external
                type="small"
              />
            </BookInfoItem>
          )}
        </div>
      </div>
      <div className="[&>p]:text-left [&>p]:text-xl [&>p]:mb-4">
        {book.sazetak && <ReactMarkdown>{book.sazetak}</ReactMarkdown>}
      </div>

      <div className="knjiga-vise">
        <H2 title="Više o izdanju" />
        {book.zanr && <BookDetailsItem title="Žanr" info={book.zanr} />}
        {book.godina && (
          <BookDetailsItem title="Godina izdanja" info={book.godina} />
        )}
        {book.zaIzdavaca && (
          <BookDetailsItem title="Za izdavača" info={book.zaIzdavaca} />
        )}
        {book.urednik && (
          <BookDetailsItem title="Urednik" info={book.urednik} />
        )}
        {book.prevod && <BookDetailsItem title="Prevod" info={book.prevod} />}
        {book.lektura && (
          <BookDetailsItem title="Lektura i korektura" info={book.lektura} />
        )}
        {book.prelom && (
          <BookDetailsItem title="Prelom i dizajn" info={book.prelom} />
        )}
        {book.dizajnNaslovnice && (
          <BookDetailsItem title="Ilustracija" info={book.dizajnNaslovnice} />
        )}
        {book.stampa && <BookDetailsItem title="Štampa" info={book.stampa} />}
        {book.obim && <BookDetailsItem title="Obim" info={book.obim} />}
        {book.isbn && <BookDetailsItem title="ISBN" info={book.isbn} />}
        {book.izdavac && (
          <BookDetailsItem title="Izdavač" info={book.izdavac} />
        )}
        {book.godina && (
          <BookDetailsItem title="Godina izdanja" info={book.godina} />
        )}
      </div>
    </div>
  )
}

export default BookPage
