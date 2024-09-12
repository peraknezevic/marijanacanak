import dynamic from "next/dynamic"

const FormPage = dynamic(() => import("@/components/forms/form-page"), {
  ssr: false,
})

const CreatePage = () => {
  return <FormPage />
}

export default CreatePage
