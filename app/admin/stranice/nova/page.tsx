import dynamic from "next/dynamic"
import { createPage } from "@/lib/actions"

const FormPage = dynamic(() => import("@/components/forms/form-page"), {
  ssr: !!false,
})

const CreatePage = () => {
  return <FormPage onSubmitAction={createPage} />
}

export default CreatePage
