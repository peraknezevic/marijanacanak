import prisma from "@/prisma/client"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"

interface Props {
  params: { id: string }
}

const TekstForma = dynamic(
  () => import("@/app/admin/price/components/TekstForma"),
  {
    ssr: false,
  }
)

const UrediTekst = async ({ params }: Props) => {
  const tekst = await prisma.tekst.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!tekst) notFound()

  return <TekstForma tekst={tekst} />
}

export default UrediTekst
