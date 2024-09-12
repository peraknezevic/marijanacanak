const NavBarItemSocial = ({
  href,
  title,
  children,
}: {
  href: string
  title: string
  children: React.ReactNode
}) => {
  return (
    <li>
      <a href={href} title={title} className="-mb-[0.125rem]">
        {children}
      </a>
    </li>
  )
}

export default NavBarItemSocial
