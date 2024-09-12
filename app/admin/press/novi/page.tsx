import dynamic from "next/dynamic"

const FormPress = dynamic(() => import("@/components/forms/form-press"), {
  ssr: false,
})

const CreatePressPage = () => {
  return <FormPress />
}

export default CreatePressPage
