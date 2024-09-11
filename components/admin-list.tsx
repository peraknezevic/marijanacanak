import { Knjiga, Novost, Press, Stranica, Tekst } from "@prisma/client"

import Button from "./button"

const AdminList = ({
  list,
  href,
}: {
  list: Array<Novost | Tekst | Knjiga | Stranica | Press>
  href: string
}) => {
  return (
    <ul className="flex flex-col gap-1">
      {list.map((item) => (
        <li key={item.id}>
          <Button
            href={`/admin/${href}/${item.id}`}
            title={item.naslov}
            type="list"
          />
        </li>
      ))}
    </ul>
  )
}

export default AdminList
