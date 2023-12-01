import Link from "next/link"

const Footer = () => {
  return (
    <footer>
      <p>
        &copy; 2023 Marijana Čanak |{" "}
        <Link href="/politika-privatnosti">Politika privatnosti</Link> | Dizajn
        sajta: <a href="https://peraknezevic.com">Pera Knežević</a>
      </p>
    </footer>
  )
}

export default Footer
