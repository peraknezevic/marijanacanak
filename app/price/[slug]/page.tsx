import H1 from "@/components/ui/h1"
import NewsArticle from "@/components/frontend/article-news"
import ReactMarkdown from "react-markdown"
import { getStoryBySlug } from "@/lib/data"
import { notFound } from "next/navigation"
import prisma from "@/prisma/client"

const Tekst = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const story = await getStoryBySlug(slug)

  if (!story) notFound()
  return (
    <NewsArticle>
      <H1 title={story.naslov} />
      {story.uvod && <ReactMarkdown>{story.uvod}</ReactMarkdown>}
      <ReactMarkdown>{story.tekst}</ReactMarkdown>
    </NewsArticle>
  )
}

export default Tekst
