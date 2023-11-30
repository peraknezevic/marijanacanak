import prisma from "@/prisma/client"
import Image from "next/image"
import Link from "next/link"

const Home = async () => {
  const biografija = await prisma.stranica.findUnique({
    where: { slug: "biografija" },
  })
  return (
    <div className="grid grid-cols-2 grid-rows-2 max-w-5xl mx-auto my-16 gap-16 text-lg">
      <div>
        {biografija?.uvod}
        <p className="text-right">
          <Link href="/biografija" className="btn btn-sm ">
            Kompletna biografija
          </Link>
        </p>
      </div>
      <div>
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
      <div>
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
    </div>
  )
}

export default Home
