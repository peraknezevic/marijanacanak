import { novostSchema } from "@/app/validationSchemas"
import prisma from "@/prisma/client"

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const novost = await prisma.novost.findUnique({
    where: { slug: params.slug },
  })
  if (!novost)
    return Response.json(
      { error: "Ova novost nije pronadjena" },
      { status: 404 }
    )
  return Response.json(novost)
}

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const body = await request.json()

  const validation = novostSchema.safeParse(body)

  if (!validation.success)
    return Response.json(validation.error.errors, { status: 400 })

  const novost = await prisma.novost.findUnique({
    where: {
      slug: params.slug,
    },
  })

  if (!novost)
    return Response.json(
      { error: "Ova novost nije pronadjena" },
      { status: 400 }
    )

  const uredjenaNovost = await prisma.novost.update({
    where: { slug: params.slug },
    data: {
      naslov: body.naslov,
      slug: body.slug,
      uvod: body.uvod,
      tekst: body.tekst,
      link: body.link,
      status: body.status,
    },
  })

  return Response.json(uredjenaNovost)
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const novost = await prisma.novost.findUnique({
    where: {
      slug: params.slug,
    },
  })

  if (!novost)
    return Response.json(
      { error: "Ova novost nije pronadjena." },
      { status: 404 }
    )

  await prisma.novost.delete({
    where: {
      slug: params.slug,
    },
  })

  return Response.json({})
}
