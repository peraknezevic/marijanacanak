import prisma from "@/prisma/client"

const Home = async () => {
  const dobrodosli = await prisma.stranica.findUnique({
    where: { slug: "dobro-došli" },
  })
  if (!dobrodosli) return <h1>Dobro došli</h1>
  return (
    <div className="my-10">
      <h1>{dobrodosli.naslov}</h1>
      <p>{dobrodosli.uvod}</p>
    </div>
  )
}

export default Home
