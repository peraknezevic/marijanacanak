const Input = ({
  type,
  name,
  placeholder,
  disabled = false,
}: {
  type: string
  name: string
  placeholder: string
  disabled?: boolean
}) => {
  return <input type={type} name={name} placeholder={placeholder} />
}

export default Input
