import H1 from "@/components/h1"
import H2 from "@/components/h2"
import LinkBtn from "@/components/link-btn"
import NewsArticle from "@/components/article-news"
import ReactMarkdown from "react-markdown"
import { getNews } from "@/lib/data"

const Novosti = async () => {
  const news = await getNews()

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
            <ReactMarkdown className="text-left">{item.uvod}</ReactMarkdown>
            <ReactMarkdown className="text-left">{item.tekst}</ReactMarkdown>
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
