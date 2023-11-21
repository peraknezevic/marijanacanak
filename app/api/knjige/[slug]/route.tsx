import { knjigeSchema } from "@/app/validationSchemas"
import prisma from "@/prisma/client"

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const knjiga = await prisma.knjiga.findUnique({
    where: { slug: params.slug },
  })
  if (!knjiga)
    return Response.json(
      { error: "Ova knjiga nije pronadjena" },
      { status: 404 }
    )
  return Response.json(knjiga)
}

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const body = await request.json()

  const validation = knjigeSchema.safeParse(body)

  if (!validation.success)
    return Response.json(validation.error.errors, { status: 400 })

  const knjiga = await prisma.knjiga.findUnique({
    where: {
      slug: params.slug,
    },
  })

  if (!knjiga)
    return Response.json(
      { error: "Ova knjiga nije pronadjena." },
      { status: 400 }
    )

  const knjigaPromena = await prisma.knjiga.update({
    where: { slug: params.slug },
    data: {
      naziv: body.naziv,
      slug: body.slug,
      zanr: body.zanr,
      izdavac: body.izdavac,
      prevod: body.prevod,
      godina: body.godina,
      prelom: body.prelom,
      dizajnNaslovnice: body.dizajnNaslovnice,
      stampa: body.stampa,
      obim: body.obim,
      isbn: body.isbn,
      kupovina: body.kupovina,
    },
  })

  return Response.json(knjigaPromena)
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const knjiga = await prisma.knjiga.findUnique({
    where: {
      slug: params.slug,
    },
  })

  if (!knjiga)
    return Response.json(
      { error: "Ova knjiga nije pronadjena." },
      { status: 404 }
    )

  await prisma.knjiga.delete({
    where: {
      slug: params.slug,
    },
  })

  return Response.json({})
}
