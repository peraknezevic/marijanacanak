import Button from "@/components/ui/button"
import H2 from "@/components/ui/h2"
import Image from "@/components/frontend/image"
import Link from "next/link"
import { getHomepageData } from "@/lib/data"

const Home = async () => {
  const [bio, news, stories, books] = await getHomepageData()

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
            <p className="text-right text-sm">
              Marijana Čanak, fotografija: Maja Tomić
            </p>
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
            <p className="text-right text-sm">
              knjige Marijane Čanak, fotografija: Maja Tomić
            </p>
          </figcaption>
        </figure>
      </div>
      <div className="order-4">
        <H2 title="Knjige" />
        {books.map((book) => (
          <p key={book.id} className="mb-1">
            <Link
              href={`/knjige/${book.slug}`}
              className="text-slate-900 cursor-pointer hover:text-slate-700 underline"
            >
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
          <H2 title="Novosti" />
          {news.map((item) => (
            <p key={item.id} className="mb-1">
              <Link
                href={`novosti/${item.slug}`}
                className="text-slate-900 cursor-pointer hover:text-slate-700 underline"
              >
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
        <H2 title="Priče" />
        {stories.map((story) => (
          <p key={story.id} className="mb-1">
            <Link
              href={
                story.spoljniLink ||
                story.patreonLink ||
                `/price/${story.slug}` ||
                ""
              }
              className="underline text-slate-900 cursor-pointer hover:text-slate-700"
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
