import dynamic from "next/dynamic"
import { getStoryById } from "@/lib/data"
import { notFound } from "next/navigation"
import { deleteStory, updateStory } from "@/lib/actions"

const FormStory = dynamic(() => import("@/components/forms/form-story"), {
  ssr: !!false,
})

const EditStoryPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const story = await getStoryById(id)

  if (!story) notFound()

  return (
    <FormStory
      story={story}
      onSubmitAction={updateStory.bind(null, story.id)}
      onDeleteAction={deleteStory.bind(null, story.id)}
    />
  )
}

export default EditStoryPage
