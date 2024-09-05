import { FieldValues, UseFormRegister } from "react-hook-form"

const FormInput = ({
  type,
  id,
  defaultValue,
  placeholder,
  register,
}: {
  type: string
  id: string
  defaultValue: string | undefined
  placeholder: string
  register: UseFormRegister<FieldValues>
}) => {
  return (
    <input
      className="border border-zinc-400 px-2 py-2 text-lg"
      type={type}
      id={id}
      defaultValue={defaultValue}
      placeholder={placeholder}
      {...register}
    />
  )
}

export default FormInput
