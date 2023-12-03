import prisma from "@/prisma/client"
import Image from "next/image"
import Link from "next/link"

const Home = async () => {
  const biografija = await prisma.stranica.findUnique({
    where: { slug: "biografija" },
  })
  const price = await prisma.tekst.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  })
  const knjige = await prisma.knjiga.findMany({
    take: 6,
    orderBy: { godina: "desc" },
  })
  const novosti = await prisma.novost.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="home">
      <div className="order-2 xl:order-1">
        {biografija?.uvod}
        <p className="text-right">
          <Link href="/biografija" className="btn btn-sm">
            Kompletna biografija
          </Link>
        </p>
      </div>
      <div className="order-1 xl:order-2">
        <figure>
          <Link href="/biografija">
            <Image
              src="/slike/marijana-canak.jpg"
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
              src="/slike/marijana-canak-knjige.jpg"
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
        {knjige.map((item) => (
          <p key="item.id" className="mb-1">
            <Link href={`/knjige/${item.slug}`} className="underline">
              {item.naziv}
            </Link>{" "}
            ({item.izdavac})
          </p>
        ))}
        <p className="text-right">
          <Link href="/knjige" className="btn btn-sm ">
            ostale knjige
          </Link>
        </p>
      </div>

      {novosti.length !== 0 && (
        <div className="order-5">
          <h2>Novosti</h2>
          {novosti.map((item) => (
            <p key="item.id" className="mb-1">
              <Link href={`novosti/${item.slug}`} className="underline">
                {item.naslov}
              </Link>
            </p>
          ))}
          <p className="text-right">
            <Link href="/novosti" className="btn btn-sm ">
              ostale novosti
            </Link>
          </p>
        </div>
      )}

      <div className="order-6">
        <h2>Priče</h2>
        {price.map((item) => (
          <p key="item.id" className="mb-1">
            <Link
              href={item.spoljniLink || item.patreonLink || ""}
              className="underline"
            >
              {item.naslov}
            </Link>
          </p>
        ))}
        <p className="text-right">
          <Link href="/price" className="btn btn-sm ">
            ostale priče
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Home
