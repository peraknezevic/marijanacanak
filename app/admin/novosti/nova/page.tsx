import dynamic from "next/dynamic"
import { createNews } from "@/lib/actions"

const FormNews = dynamic(() => import("@/components/forms/form-news"), {
  ssr: !!false,
})

const CreateNewsPage = () => {
  return <FormNews onSubmitAction={createNews} />
}

export default CreateNewsPage
