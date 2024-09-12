import dynamic from "next/dynamic"
import { getPageById } from "@/lib/data"
import { notFound } from "next/navigation"

const FormPage = dynamic(() => import("@/components/forms/form-page"), {
  ssr: false,
})

const EditPage = async ({ params }: { params: { id: string } }) => {
  const page = await getPageById(params.id)

  if (!page) notFound()

  return <FormPage page={page} />
}

export default EditPage
