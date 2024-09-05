const FormWrapper = ({
  children,
  onSubmit,
}: {
  children: React.ReactNode
  onSubmit: () => void
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-zinc-100 px-6 py-8 mx-auto gap-4 flex max-w-2xl flex-col space-y-4"
    >
      {children}
    </form>
  )
}

export default FormWrapper
