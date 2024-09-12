import {
  FaFacebookSquare,
  FaGoodreads,
  FaInstagramSquare,
  FaPatreon,
} from "react-icons/fa"

import NavBarItem from "./navbar-item"
import NavBarItemSocial from "./navbar-item-social"

const NavBar = () => {
  return (
    <nav>
      <ul className="flex flex-wrap list-none xl:flex-nowrap text-lg uppercase justify-start gap-4 items-baseline">
        <NavBarItem href="/novosti" title="Novosti" />
        <NavBarItem href="/knjige" title="Knjige" />
        <NavBarItem href="/price" title="Priče" />
        <NavBarItem href="/biografija" title="Biografija" />
        <NavBarItem href="/press" title="Press" />
        <NavBarItem href="/kontakt" title="Kontakt" />
        <NavBarItemSocial
          href="https://www.patreon.com/MarijanaCanak"
          title="Marijana na Patreonu"
        >
          <FaPatreon />
        </NavBarItemSocial>
        <NavBarItemSocial
          href="https://www.instagram.com/canakmarijana/"
          title="Marijana na Instagramu"
        >
          <FaInstagramSquare />
        </NavBarItemSocial>
        <NavBarItemSocial
          href="https://www.facebook.com/scribowoman"
          title="Marijana na Facebooku"
        >
          <FaFacebookSquare />
        </NavBarItemSocial>

        <NavBarItemSocial
          href="https://www.goodreads.com/author/show/8286470.Marijana_anak"
          title="Marijana na GoodReads"
        >
          <FaGoodreads />
        </NavBarItemSocial>
      </ul>
    </nav>
  )
}

export default NavBar
