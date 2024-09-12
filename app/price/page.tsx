import H1 from "@/components/ui/h1"
import { Metadata } from "next"
import StoryCard from "@/components/frontend/story-card"
import { getPublishedStories } from "@/lib/data"

const Tekstovi = async () => {
  const stories = await getPublishedStories()

  return (
    <div>
      <H1 title="Priče" />
      {stories.map((story) => (
        <StoryCard story={story} key={story.id} />
      ))}
    </div>
  )
}

export const metadata: Metadata = {
  title: "Priče Marijane Čanak",
  description: "Priče Marijane Čanak",
  keywords: ["Marijana Čanak", "Marijana Čanak priče"],
  openGraph: {
    title: "Priče Marijane Čanak",
    description: "Priče Marijane Čanak",
    images: "https://www.marijanacanak.com/slike/marijana-canak.jpg",
  },
}

export default Tekstovi
