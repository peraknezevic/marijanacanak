import dynamic from "next/dynamic"
import { getPressItemById } from "@/lib/data"
import { notFound } from "next/navigation"
import { deletePress, updatePress } from "@/lib/actions"

const FormPress = dynamic(() => import("@/components/forms/form-press"), {
  ssr: !!false,
})

const EditPressPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const pressItem = await getPressItemById(id)

  if (!pressItem) notFound()

  return (
    <FormPress
      pressItem={pressItem}
      onSubmitAction={updatePress.bind(null, pressItem.id)}
      onDeleteAction={deletePress.bind(null, pressItem.id)}
    />
  )
}

export default EditPressPage
