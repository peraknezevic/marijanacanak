import prisma from "@/prisma/client"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"

interface Props {
  params: { id: string }
}

const PressForma = dynamic(
  () => import("@/app/admin/press/components/PressForma"),
  {
    ssr: false,
  }
)

const UrediPress = async ({ params }: Props) => {
  const press = await prisma.press.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!press) notFound()

  return <PressForma press={press} />
}

export default UrediPress
