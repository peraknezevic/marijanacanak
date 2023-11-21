import { tekstSchema } from "@/app/validationSchemas"
import prisma from "@/prisma/client"

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const tekst = await prisma.tekst.findUnique({
    where: { slug: params.slug },
  })
  if (!tekst)
    return Response.json(
      { error: "Ovaj tekst nije pronadjen" },
      { status: 404 }
    )
  return Response.json(tekst)
}

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const body = await request.json()

  const validation = tekstSchema.safeParse(body)

  if (!validation.success)
    return Response.json(validation.error.errors, { status: 400 })

  const tekst = await prisma.tekst.findUnique({
    where: {
      slug: params.slug,
    },
  })

  if (!tekst)
    return Response.json(
      { error: "Ovaj tekst nije pronadjen." },
      { status: 400 }
    )

  const tekstPromena = await prisma.tekst.update({
    where: { slug: params.slug },
    data: {
      naslov: body.naslov,
      slug: body.slug,
      uvod: body.uvod,
      tekst: body.tekst,
      patreonLink: body.patreonLink,
      spoljniLink: body.spoljniLink,
      status: body.status,
    },
  })

  return Response.json(tekstPromena)
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const tekst = await prisma.tekst.findUnique({
    where: {
      slug: params.slug,
    },
  })

  if (!tekst)
    return Response.json(
      { error: "Ovaj tekst nije pronadjen." },
      { status: 404 }
    )

  await prisma.tekst.delete({
    where: {
      slug: params.slug,
    },
  })

  return Response.json({})
}
