import dynamic from "next/dynamic"

const FormBook = dynamic(() => import("@/components/forms/form-book"), {
  ssr: false,
})

const CreateBookPage = () => {
  return <FormBook />
}

export default CreateBookPage
