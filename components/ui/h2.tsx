import Link from "next/link"

const H2 = ({
  title,
  slug,
  link,
}: {
  title: string
  slug?: string
  link?: string
}) => {
  if (link)
    return (
      <a href={link}>
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
      </a>
    )
  if (slug)
    return (
      <Link href={slug}>
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
      </Link>
    )

  return <h2 className="text-3xl font-bold mb-8">{title}</h2>
}

export default H2
