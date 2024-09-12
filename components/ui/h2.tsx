import Link from "next/link"
import { twMerge } from "tailwind-merge"

const H2 = ({
  title,
  slug,
  link,
  uppercase = false,
}: {
  title: string
  slug?: string
  link?: string
  uppercase?: boolean
}) => {
  if (link)
    return (
      <a href={link}>
        <h2
          className={twMerge(
            "text-3xl font-bold mb-8",
            uppercase && "uppercase"
          )}
        >
          {title}
        </h2>
      </a>
    )
  if (slug)
    return (
      <Link href={slug}>
        <h2
          className={twMerge(
            "text-3xl font-bold mb-8",
            uppercase && "uppercase"
          )}
        >
          {title}
        </h2>
      </Link>
    )

  return (
    <h2
      className={twMerge("text-3xl font-bold mb-8", uppercase && "uppercase")}
    >
      {title}
    </h2>
  )
}

export default H2
