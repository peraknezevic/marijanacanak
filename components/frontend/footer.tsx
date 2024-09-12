import Link from "next/link"
import Patreon from "./patreon"

const Footer = () => {
  return (
    <footer className="flex flex-col gap-8 text-center mx-auto my-8 xl:my-16">
      <Patreon text="Podrži nastajanje novih priča" />
      <div>
        <p>
          &copy; 2023 Marijana Čanak |{" "}
          <Link href="/politika-privatnosti">Politika privatnosti</Link> |
          Dizajn sajta: <a href="https://peraknezevic.com">Pera Knežević</a> |
          v2.0
        </p>
      </div>
    </footer>
  )
}

export default Footer
