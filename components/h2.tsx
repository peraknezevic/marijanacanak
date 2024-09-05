import Link from "next/link"

const H2 = ({ title, slug }: { title: string; slug: string }) => {
  return (
    <Link href={slug}>
      <h2 className="text-3xl font-bold mb-8">{title}</h2>
    </Link>
  )
}

export default H2
