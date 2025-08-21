import dynamic from "next/dynamic"
import { getPageById } from "@/lib/data"
import { notFound } from "next/navigation"
import { deletePage, updatePage } from "@/lib/actions"

const FormPage = dynamic(() => import("@/components/forms/form-page"), {
  ssr: !!false,
})

const EditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const page = await getPageById(id)

  if (!page) notFound()

  return (
    <FormPage
      page={page}
      onSubmitAction={updatePage.bind(null, page.id)}
      onDeleteAction={deletePage.bind(null, page.id)}
    />
  )
}

export default EditPage
