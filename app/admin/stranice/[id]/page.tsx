import prisma from "@/prisma/client"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"

interface Props {
  params: { id: string }
}

const StranicaForma = dynamic(
  () => import("@/app/admin/stranice/components/StranicaForma"),
  {
    ssr: false,
  }
)

const UrediTekst = async ({ params }: Props) => {
  const stranica = await prisma.stranica.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!stranica) notFound()

  return <StranicaForma stranica={stranica} />
}

export default UrediTekst
