const FormWrapper = ({
  children,
  onSubmit,
}: {
  children: React.ReactNode
  onSubmit: (() => void) | ((e: any) => Promise<void>)
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-zinc-100 px-6 py-8 gap-4 flex flex-col space-y-4"
    >
      {children}
    </form>
  )
}

export default FormWrapper
