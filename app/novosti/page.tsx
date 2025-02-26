import H1 from "@/components/ui/h1"
import H2 from "@/components/ui/h2"
import LinkBtn from "@/components/ui/button"
import NewsArticle from "@/components/frontend/article-news"
import ReactMarkdown from "react-markdown"
import { getPublishedNews } from "@/lib/data"
import rehypeRaw from "rehype-raw"

const Novosti = async () => {
  const news = await getPublishedNews()

  return (
    <div>
      <H1 title="Novosti" />
      {news.length === 0 && (
        <p className="text-center">Trenutno nema novih objava</p>
      )}
      <div>
        {news.map((item) => (
          <NewsArticle key={item.id}>
            <H2 title={item.naslov} slug={`novosti/${item.slug}`} />
            <ReactMarkdown className="text-left" rehypePlugins={[rehypeRaw]}>
              {item.uvod}
            </ReactMarkdown>
            <ReactMarkdown className="text-left" rehypePlugins={[rehypeRaw]}>
              {item.tekst}
            </ReactMarkdown>
            {item.link && (
              <LinkBtn href={item.link} title="Više informacija" type="small" />
            )}
            <hr />
          </NewsArticle>
        ))}
      </div>
    </div>
  )
}

export default Novosti
