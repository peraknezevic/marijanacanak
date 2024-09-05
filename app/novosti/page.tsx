import H1 from "@/components/h1"
import LinkBtnSm from "@/components/link-btn-sm"
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
            <h2>{item.naslov}</h2>
            <ReactMarkdown className="text-left">{item.uvod}</ReactMarkdown>
            <ReactMarkdown className="text-left">{item.tekst}</ReactMarkdown>
            {item.link && (
              <p>
                <LinkBtnSm href={item.link} title="Više informacija" />
              </p>
            )}
            <hr />
          </NewsArticle>
        ))}
      </div>
    </div>
  )
}

export default Novosti
