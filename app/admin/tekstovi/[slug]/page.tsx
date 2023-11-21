import prisma from "@/prisma/client"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"

interface Props {
  params: { slug: string }
}

const TekstForma = dynamic(
  () => import("@/app/admin/tekstovi/components/TekstForma"),
  {
    ssr: false,
  }
)

const UrediTekst = async ({ params }: Props) => {
  const tekst = await prisma.tekst.findUnique({
    where: {
      slug: params.slug,
    },
  })

  if (!tekst) notFound()

  return <TekstForma tekst={tekst} />
}

export default UrediTekst
