"use client"

import { Knjiga as Book } from "@prisma/client"
import BookInfoItem from "./book-info-item"
import Button from "../ui/button"
import H2 from "../ui/h2"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import { imageKitLoader } from "@/lib/utils"

const BookCard = ({ book }: { book: Book }) => {
  return (
    <li className="flex flex-col mt-4 xl:mt-8 mb-16 lg:mb-32 gap-16 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-16">
        <div className="flex flex-col gap-4 lg:gap-8 md:w-[50%]">
          <Image
            className="shadow-2xl border-2 border-zinc-400 mx-auto md:mx-0"
            src={`/marijanacanak/slike/knjige/${book.slug}.jpg`}
            loader={imageKitLoader}
            quality={80}
            width={400}
            height={500}
            alt={book.naslov}
          />
        </div>
        <div className="lg:px-6 py-4 lg:py-10 items-center text-xl leading-8">
          <H2 title={book.naslov} slug={`knjige/${book.slug}`} uppercase />

          {book.izdavac && <BookInfoItem title="Izdavač" info={book.izdavac} />}
          {book.zanr && <BookInfoItem title="Žanr" info={book.zanr} />}
          {book.godina && (
            <BookInfoItem title="Godina izdanja" info={book.godina} />
          )}
          <BookInfoItem>
            <Button
              href={`knjige/${book.slug}`}
              title="više o ovom izdanju"
              type="small"
            />
            {book.kupovina && (
              <Button
                href={book.kupovina}
                title="naruči knjigu"
                type="small"
                external
              />
            )}
          </BookInfoItem>
        </div>
      </div>
      <div className="[&>p]:text-left [&>p]:text-xl [&>p]:mb-4">
        {book.sazetak && <ReactMarkdown>{book.sazetak}</ReactMarkdown>}
      </div>
    </li>
  )
}

export default BookCard
