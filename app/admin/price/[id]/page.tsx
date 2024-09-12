import dynamic from "next/dynamic"
import { getStoryById } from "@/lib/data"
import { notFound } from "next/navigation"

const FormStory = dynamic(() => import("@/components/forms/form-story"), {
  ssr: false,
})

const EditStoryPage = async ({ params }: { params: { id: string } }) => {
  const story = await getStoryById(params.id)

  if (!story) notFound()

  return <FormStory story={story} />
}

export default EditStoryPage
