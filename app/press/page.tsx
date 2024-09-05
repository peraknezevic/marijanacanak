import H1 from "@/components/h1"
import H2 from "@/components/h2"
import Link from "next/link"
import NewsArticle from "@/components/article-news"
import ReactMarkdown from "react-markdown"
import { getPress } from "@/lib/data"

const Press = async () => {
  const press = await getPress()

  return (
    <>
      <H1 title="Press" />
      <ul>
        {press.map((item) => (
          <NewsArticle key={item.id}>
            <Link href={item.link}>
              <H2 title={item.naslov} />
            </Link>
            <ReactMarkdown className="text-left">{item.opis}</ReactMarkdown>
            <hr />
          </NewsArticle>
        ))}
      </ul>
    </>
  )
}

export default Press
