import H1 from "@/components/h1"
import NewsArticle from "@/components/article-news"
import ReactMarkdown from "react-markdown"
import { getNewsItem } from "@/lib/data"
import { notFound } from "next/navigation"

const Novost = async ({ params }: { params: { slug: string } }) => {
  const newsItem = await getNewsItem(params.slug)

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
