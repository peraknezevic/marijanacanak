import prisma from "@/prisma/client"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"

interface Props {
  params: { slug: string }
}

const KnjigaForma = dynamic(
  () => import("@/app/admin/knjige/components/KnjigaForma"),
  {
    ssr: false,
  }
)

const UrediKnjigu = async ({ params }: Props) => {
  const knjiga = await prisma.knjiga.findUnique({
    where: {
      slug: params.slug,
    },
  })

  if (!knjiga) notFound()

  return <KnjigaForma knjiga={knjiga} />
}

export default UrediKnjigu
