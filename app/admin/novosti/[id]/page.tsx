import prisma from "@/prisma/client"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"

interface Props {
  params: { id: string }
}

const NovostForma = dynamic(
  () => import("@/app/admin/novosti/components/NovostForma"),
  {
    ssr: false,
  }
)

const UrediNovost = async ({ params }: Props) => {
  const novost = await prisma.novost.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!novost) notFound()

  return <NovostForma novost={novost} />
}

export default UrediNovost
