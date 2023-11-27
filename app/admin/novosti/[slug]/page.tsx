import prisma from "@/prisma/client"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"

interface Props {
  params: { slug: string }
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
      slug: params.slug,
    },
  })

  if (!novost) notFound()

  return <NovostForma novost={novost} />
}

export default UrediNovost
