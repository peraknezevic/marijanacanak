const FormBlock = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-2 [&>input]:border [&>input]:border-zinc-400 [&>input]:p-2 [&>input]:text-lg [&>select]:border [&>select]:border-zinc-400 [&>select]:p-2 [&>select]:text-base [&>select]:uppercase">
      {children}
    </div>
  )
}

export default FormBlock
