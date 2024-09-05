import Logo from "./logo"
import NavBar from "./navbar"
import Patreon from "./patreon"

const Header = () => {
  return (
    <header className="flex flex-auto flex-col flex-wrap lg:flex-row justify-between items-center lg:px-2 xl:px-16 xl:gap-8">
      <Logo />
      <NavBar />
      <Patreon text="Podrži moje pisanje, pretplati se na nove priče na Patreon-u" />
    </header>
  )
}

export default Header
