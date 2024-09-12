import {
  getLatestBooks,
  getLatestPublishedNews,
  getLatestPublishedStories,
  getPageBySlug,
} from "@/lib/data"

import Button from "@/components/ui/button"
import Image from "@/components/frontend/image"
import Link from "next/link"

const Home = async () => {
  const bio = await getPageBySlug("biografija")
  const stories = await getLatestPublishedStories(5)
  const books = await getLatestBooks(6)
  const news = await getLatestPublishedNews(5)

  return (
    <div className="grid lg:grid-cols-2 lg:grid-rows-2 max-w-5xl mx-auto my-8 xl:my-16 gap-8 xl:gap-16 text-lg">
      <div className="order-2 lg:order-1">
        {bio?.uvod}
        <p className="text-right">
          <Button
            href="/biografija"
            title="Kompletna biografija"
            type="small"
          />
        </p>
      </div>
      <div className="order-1 lg:order-2">
        <figure>
          <Link href="/biografija">
            <Image
              src="https://ik.imagekit.io/tkrwfvazw/marijanacanak/slike/homepage/marijana-canak.jpg"
              alt="Marijana Čanak"
              width={1600}
              height={1100}
              className="rounded-2xl"
            />
          </Link>
          <figcaption>
            <p>Marijana Čanak, fotografija: Maja Tomić</p>
          </figcaption>
        </figure>
      </div>
      <div className="order-3">
        <figure>
          <Link href="/knjige">
            <Image
              src="https://ik.imagekit.io/tkrwfvazw/marijanacanak/slike/homepage/marijana-canak-knjige.jpg"
              alt="Knjige Marijane Čanak"
              width={1600}
              height={1100}
              className="rounded-2xl"
            />
          </Link>
          <figcaption>
            <p>knjige Marijane Čanak, fotografija: Maja Tomić</p>
          </figcaption>
        </figure>
      </div>
      <div className="order-4">
        <h2>Knjige</h2>
        {books.map((book) => (
          <p key={book.id} className="mb-1">
            <Link href={`/knjige/${book.slug}`} className="underline">
              {book.naslov}
            </Link>{" "}
            ({book.izdavac})
          </p>
        ))}
        <p className="text-right">
          <Button href="/knjige" title="ostale knjige" type="small" />
        </p>
      </div>

      {news.length !== 0 && (
        <div className="order-5">
          <h2>Novosti</h2>
          {news.map((item) => (
            <p key={item.id} className="mb-1">
              <Link href={`novosti/${item.slug}`} className="underline">
                {item.naslov}
              </Link>
            </p>
          ))}
          <p className="text-right">
            <Button href="/novosti" title="ostale novosti" type="small" />
          </p>
        </div>
      )}

      <div className="order-6">
        <h2>Priče</h2>
        {stories.map((story) => (
          <p key={story.id} className="mb-1">
            <Link
              href={story.spoljniLink || story.patreonLink || ""}
              className="underline"
            >
              {story.naslov}
            </Link>
          </p>
        ))}
        <p className="text-right">
          <Button href="/price" title="ostale priče" type="small" />
        </p>
      </div>
    </div>
  )
}

export default Home
