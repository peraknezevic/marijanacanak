import Link from "next/link"
import { twMerge } from "tailwind-merge"

const LinkBtn = ({
  href,
  title,
  type,
  external = false,
}: {
  href: string
  title: string
  type: "regular" | "small" | "patreon" | "patreon-small"
  external?: boolean
}) => {
  let classList
  const baseClasses =
    "inline-block my-4 py-1 px-4 text-slate-100 uppercase tracking-wide no-underline cursor-pointer hover:opacity-75 hover:text-slate-100"

  switch (type) {
    case "regular":
      classList = twMerge(baseClasses, "bg-slate-800 font-medium")
      break
    case "small":
      classList = twMerge(baseClasses, "bg-slate-800 font-bold text-sm")
      break
    case "patreon":
      classList = twMerge(baseClasses, "bg-patreon font-medium")
      break
    case "patreon-small":
      classList = twMerge(baseClasses, "bg-patreon font-bold text-sm")
      break
  }

  if (external) {
    return (
      <a href={href} className={classList}>
        {title}
      </a>
    )
  }

  return (
    <Link href={href} className={classList}>
      {title}
    </Link>
  )
}

export default LinkBtn
