import dynamic from "next/dynamic"
import { getNewsById } from "@/lib/data"
import { notFound } from "next/navigation"

const FormNews = dynamic(() => import("@/components/forms/form-news"), {
  ssr: false,
})

const EditNewsPage = async ({ params }: { params: { id: string } }) => {
  const news = await getNewsById(params.id)

  if (!news) notFound()

  return <FormNews news={news} />
}

export default EditNewsPage
