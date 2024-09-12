import H1 from "@/components/ui/h1"
import NewsArticle from "@/components/frontend/article-news"
import ReactMarkdown from "react-markdown"
import { getNewsBySlug } from "@/lib/data"
import { notFound } from "next/navigation"

const Novost = async ({ params }: { params: { slug: string } }) => {
  const newsItem = await getNewsBySlug(params.slug)

  if (!newsItem) notFound()

  return (
    <NewsArticle>
      <H1 title={newsItem.naslov} />
      {newsItem.uvod && <ReactMarkdown>{newsItem.uvod}</ReactMarkdown>}
      <ReactMarkdown>{newsItem.tekst}</ReactMarkdown>
    </NewsArticle>
  )
}

export default Novost
