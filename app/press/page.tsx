import H1 from "@/components/ui/h1"
import H2 from "@/components/ui/h2"
import Link from "next/link"
import NewsArticle from "@/components/frontend/article-news"
import ReactMarkdown from "react-markdown"
import { getPublishedPress } from "@/lib/data"
import rehypeRaw from "rehype-raw"

const Press = async () => {
  const press = await getPublishedPress()

  return (
    <>
      <H1 title="Press" />
      <ul>
        {press.map((item) => (
          <NewsArticle key={item.id}>
            <Link href={item.link}>
              <H2 title={item.naslov} />
            </Link>
            <ReactMarkdown className="text-left" rehypePlugins={[rehypeRaw]}>
              {item.opis}
            </ReactMarkdown>
            <hr />
          </NewsArticle>
        ))}
      </ul>
    </>
  )
}

export default Press
