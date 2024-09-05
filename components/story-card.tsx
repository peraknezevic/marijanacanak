import H2 from "./h2"
import LinkBtn from "./link-btn"
import ReactMarkdown from "react-markdown"
import { Tekst } from "@prisma/client"

const StoryCard = ({ story }: { story: Tekst }) => {
  return (
    <article className="prose lg:prose-xl mx-auto text-left mb-32">
      <H2 title={story.naslov} slug={`/price/${story.slug}`} />

      {story.uvod && <ReactMarkdown>{story.uvod}</ReactMarkdown>}
      {story.patreonLink && (
        <a href={story.patreonLink} className="btn btn-sm bg-patreon">
          Pročitajte na Patreonu
        </a>
      )}
      {story.spoljniLink && (
        <LinkBtn
          href={story.spoljniLink}
          title={`Ceo tekst na {story.nazivSpoljnogLinka}`}
          type="small"
        />
      )}
    </article>
  )
}

export default StoryCard
