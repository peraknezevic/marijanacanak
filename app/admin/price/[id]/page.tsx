import dynamic from "next/dynamic"
import { getStoryById } from "@/lib/data"
import { notFound } from "next/navigation"

const FormStory = dynamic(() => import("@/components/forms/form-story"), {
  ssr: false,
})

const EditStoryPage = async ({ params }: { params: { id: string } }) => {
  const tekst = await getStoryById(params.id)

  if (!tekst) notFound()

  return <FormStory tekst={tekst} />
}

export default EditStoryPage
