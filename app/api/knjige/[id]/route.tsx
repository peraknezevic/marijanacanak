"use server"
import { knjigeSchema } from "@/app/validationSchemas"
import prisma from "@/prisma/client"
import { revalidatePath } from "next/cache"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const knjiga = await prisma.knjiga.findUnique({
    where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  const body = await request.json()

  const validation = knjigeSchema.safeParse(body)

  if (!validation.success)
    return Response.json(validation.error.errors, { status: 400 })

  const knjiga = await prisma.knjiga.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!knjiga)
    return Response.json(
      { error: "Ova knjiga nije pronadjena." },
      { status: 400 }
    )

  const knjigaPromena = await prisma.knjiga.update({
    where: { id: params.id },
    data: {
      naziv: body.naziv,
      slug: body.slug,
      sazetak: body.sazetak,
      zanr: body.zanr,
      izdavac: body.izdavac,
      zaIzdavaca: body.zaIzdavaca,
      lektura: body.lektura,
      prevod: body.prevod,
      urednik: body.urednik,
      godina: body.godina,
      prelom: body.prelom,
      dizajnNaslovnice: body.dizajnNaslovnice,
      stampa: body.stampa,
      obim: body.obim,
      isbn: body.isbn,
      kupovina: body.kupovina,
    },
  })

  revalidatePath("/knjige")
  revalidatePath(`/knjige/${knjigaPromena.slug}`)

  return Response.json(knjigaPromena)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const knjiga = await prisma.knjiga.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!knjiga)
    return Response.json(
      { error: "Ova knjiga nije pronadjena." },
      { status: 404 }
    )

  await prisma.knjiga.delete({
    where: {
      id: params.id,
    },
  })

  revalidatePath("/knjige")

  return Response.json({})
}
