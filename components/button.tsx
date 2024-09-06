import Link from "next/link"
import { twMerge } from "tailwind-merge"

type Button = {
  href?: string
  title: string
  type: "regular" | "small" | "patreon" | "patreon-small" | "list"
  external?: boolean
  submit?: boolean
  active?: boolean
  props?: any
}

const Button = ({
  href,
  title,
  type,
  external = false,
  submit = false,
  active = false,
  props,
}: Button) => {
  let classList
  const baseClasses =
    "inline-block my-4 py-1 px-4 text-slate-100 tracking-wide no-underline cursor-pointer hover:opacity-75 hover:text-slate-100"

  switch (type) {
    case "regular":
      classList = twMerge(baseClasses, "bg-slate-800 font-medium uppercase")
      break
    case "small":
      classList = twMerge(
        baseClasses,
        "bg-slate-800 font-bold text-sm uppercase"
      )
      break
    case "patreon":
      classList = twMerge(baseClasses, "bg-patreon font-medium uppercase")
      break
    case "patreon-small":
      classList = twMerge(baseClasses, "bg-patreon font-bold text-sm uppercase")
      break
    case "list":
      classList = twMerge(
        baseClasses,
        "w-full my-2 bg-white text-slate-800 font-medium text-lg border border-slate-800 b-2 hover:bg-[#F9EED8] hover:text-slate-800 hover:opacity-100"
      )
      break
  }

  if (external) {
    return (
      <a href={href} className={classList}>
        {title}
      </a>
    )
  }

  if (submit) {
    return (
      <button type="submit" className={classList} {...props}>
        {title}
      </button>
    )
  }

  if (href && external === false)
    return (
      <Link href={href} className={twMerge(classList, active && "opacity-50")}>
        {title}
      </Link>
    )
}

export default Button
