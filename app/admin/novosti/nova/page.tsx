import dynamic from "next/dynamic"

const FormNews = dynamic(() => import("@/components/forms/form-news"), {
  ssr: false,
})

const CreateNewsPage = () => {
  return <FormNews />
}

export default CreateNewsPage
