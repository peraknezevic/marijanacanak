import dynamic from "next/dynamic"
import { getPressItemById } from "@/lib/data"
import { notFound } from "next/navigation"

const FormPress = dynamic(() => import("@/components/forms/form-press"), {
  ssr: false,
})

const EditPressPage = async ({ params }: { params: { id: string } }) => {
  const pressItem = await getPressItemById(params.id)

  if (!pressItem) notFound()

  return <FormPress pressItem={pressItem} />
}

export default EditPressPage
