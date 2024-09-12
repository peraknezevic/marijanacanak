import { Bodoni_Moda } from "next/font/google"
import Link from "next/link"

const bodoni = Bodoni_Moda({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
})

const Logo = () => {
  return (
    <div className="my-8 text-slate-500">
      <div className="text-3xl xl:text-4xl font-normal">
        <Link
          href="/"
          className={`${bodoni.className} text-slate-500 uppercase`}
        >
          Marijana Čanak
        </Link>
      </div>
      <div className="text-base text-center lg:text-right italic">
        Strast za otkrivanjem priče
      </div>
    </div>
  )
}

export default Logo
