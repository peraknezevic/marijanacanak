import Link from "next/link"

const Footer = () => {
  return (
    <footer>
      <div>
        <p>
          <a
            className="btn-patreon"
            href="https://www.patreon.com/MarijanaCanak"
          >
            Podrži nastajanje novih priča
          </a>
        </p>
      </div>
      <div>
        <p>
          &copy; 2023 Marijana Čanak |{" "}
          <Link href="/politika-privatnosti">Politika privatnosti</Link> |
          Dizajn sajta: <a href="https://peraknezevic.com">Pera Knežević</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
