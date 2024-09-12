const FormError = ({ children }: { children: React.ReactNode }) => {
  if (!children) return null
  return <p className="text-red-600">{children}</p>
}

export default FormError
