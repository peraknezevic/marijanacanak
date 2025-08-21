import dynamic from "next/dynamic"
import { createPress } from "@/lib/actions"

const FormPress = dynamic(() => import("@/components/forms/form-press"), {
  ssr: !!false,
})

const CreatePressPage = () => {
  return <FormPress onSubmitAction={createPress} />
}

export default CreatePressPage
