const H1 = ({ title, small = false }: { title: string; small?: boolean }) => {
  if (small)
    return <h1 className="text-3xl font-bold mb-8 uppercase">{title}</h1>
  return (
    <h1 className="text-center py-8 xl:py-16 text-4xl xl:text-6xl font-bold text-slate-500">
      {title}
    </h1>
  )
}

export default H1
