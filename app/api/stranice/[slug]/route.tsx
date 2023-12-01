import { stranicaSchema } from "@/app/validationSchemas"
import prisma from "@/prisma/client"
import { revalidatePath } from "next/cache"

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const stranica = await prisma.stranica.findUnique({
    where: { slug: params.slug },
  })
  if (!stranica)
    return Response.json(
      { error: "Ova stranica nije pronadjena" },
      { status: 404 }
    )
  return Response.json(stranica)
}

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const body = await request.json()

  const validation = stranicaSchema.safeParse(body)

  if (!validation.success)
    return Response.json(validation.error.errors, { status: 400 })

  const stranica = await prisma.stranica.findUnique({
    where: {
      slug: params.slug,
    },
  })

  if (!stranica)
    return Response.json(
      { error: "Ova stranica nije pronadjena." },
      { status: 400 }
    )

  const updateStranice = await prisma.stranica.update({
    where: { slug: params.slug },
    data: {
      naslov: body.naslov,
      slug: body.slug,
      uvod: body.uvod,
      tekst: body.tekst,
      status: body.status,
    },
  })

  revalidatePath(`/${updateStranice.slug}`)

  return Response.json(updateStranice)
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const stranica = await prisma.stranica.findUnique({
    where: {
      slug: params.slug,
    },
  })

  if (!stranica)
    return Response.json(
      { error: "Ova stranica nije pronadjena." },
      { status: 404 }
    )

  await prisma.stranica.delete({
    where: {
      slug: params.slug,
    },
  })

  return Response.json({})
}
