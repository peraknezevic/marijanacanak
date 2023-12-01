import prisma from "@/prisma/client"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

const Novost = async ({ params }: { params: { slug: string } }) => {
  const novost = await prisma.novost.findUnique({
    where: { slug: params.slug },
  })
  if (!novost) notFound()
  return (
    <article className="prose lg:prose-xl mx-auto my-10">
      <h1 className="text-emerald-900 text-4xl">{novost.naslov}</h1>
      {novost.uvod && <ReactMarkdown>{novost.uvod}</ReactMarkdown>}
      <ReactMarkdown>{novost.tekst}</ReactMarkdown>
    </article>
  )
}

export default Novost
