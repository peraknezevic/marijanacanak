import dynamic from "next/dynamic"
import { getNewsById } from "@/lib/data"
import { notFound } from "next/navigation"
import { deleteNews, updateNews } from "@/lib/actions"

const FormNews = dynamic(() => import("@/components/forms/form-news"), {
  ssr: !!false,
})

const EditNewsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const news = await getNewsById(id)

  if (!news) notFound()

  return (
    <FormNews
      news={news}
      onSubmitAction={updateNews.bind(null, news.id)}
      onDeleteAction={deleteNews.bind(null, news.id)}
    />
  )
}

export default EditNewsPage
