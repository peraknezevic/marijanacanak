import dynamic from "next/dynamic"
import { createStory } from "@/lib/actions"

const FormStory = dynamic(() => import("@/components/forms/form-story"), {
  ssr: !!false,
})

const CreateStoryPage = () => {
  return <FormStory onSubmitAction={createStory} />
}

export default CreateStoryPage
