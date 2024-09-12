import H2 from "../ui/h2"
import LinkBtn from "../ui/button"
import NewsArticle from "./article-news"
import ReactMarkdown from "react-markdown"
import { Tekst } from "@prisma/client"

const StoryCard = ({ story }: { story: Tekst }) => {
  return (
    <NewsArticle>
      <H2 title={story.naslov} slug={`/price/${story.slug}`} />
      {story.uvod && <ReactMarkdown>{story.uvod}</ReactMarkdown>}
      {story.patreonLink && (
        <LinkBtn
          href={story.patreonLink}
          title="Pročitajte na Patreonu"
          type="patreon-small"
          external
        />
      )}
      {story.spoljniLink && (
        <LinkBtn
          href={story.spoljniLink}
          title={`Ceo tekst na ${story.nazivSpoljnogLinka}`}
          type="small"
          external
        />
      )}
    </NewsArticle>
  )
}

export default StoryCard
