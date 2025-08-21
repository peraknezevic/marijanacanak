import dynamic from "next/dynamic"
import { createBook } from "@/lib/actions"

const FormBook = dynamic(() => import("@/components/forms/form-book"), {
  ssr: !!false,
})

const CreateBookPage = () => {
  return <FormBook onSubmitAction={createBook} />
}

export default CreateBookPage
