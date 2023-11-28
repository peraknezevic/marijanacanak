import KnjigaStranica from "@/components/KnjigaStranica"
import prisma from "@/prisma/client"
import { notFound } from "next/navigation"
import React from "react"

const Knjiga = async ({ params }: { params: { slug: string } }) => {
  const knjiga = await prisma.knjiga.findUnique({
    where: { slug: params.slug },
  })

  if (!knjiga) return notFound()

  return <KnjigaStranica knjiga={knjiga} />
}

export default Knjiga
