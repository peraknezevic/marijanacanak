import dynamic from "next/dynamic"

const FormStory = dynamic(() => import("@/components/forms/form-story"), {
  ssr: false,
})

const CreateStoryPage = () => {
  return <FormStory />
}

export default CreateStoryPage
