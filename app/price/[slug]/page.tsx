import prisma from "@/prisma/client"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

const Tekst = async ({ params }: { params: { slug: string } }) => {
  const tekst = await prisma.tekst.findUnique({
    where: { slug: params.slug },
  })
  if (!tekst) notFound()
  return (
    <article className="prose lg:prose-xl mx-auto my-10">
      <h1 className="text-emerald-900 text-4xl">{tekst.naslov}</h1>
      {tekst.uvod && <ReactMarkdown>{tekst.uvod}</ReactMarkdown>}
      <ReactMarkdown>{tekst.tekst}</ReactMarkdown>
    </article>
  )
}

export default Tekst
