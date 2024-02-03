"use server"
import { tekstSchema } from "@/app/validationSchemas"
import prisma from "@/prisma/client"
import { revalidatePath } from "next/cache"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const tekst = await prisma.tekst.findUnique({
    where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  const body = await request.json()

  const validation = tekstSchema.safeParse(body)

  if (!validation.success)
    return Response.json(validation.error.errors, { status: 400 })

  const tekst = await prisma.tekst.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!tekst)
    return Response.json(
      { error: "Ovaj tekst nije pronadjen." },
      { status: 400 }
    )

  const tekstPromena = await prisma.tekst.update({
    where: { id: params.id },
    data: {
      naslov: body.naslov,
      slug: body.slug,
      uvod: body.uvod,
      tekst: body.tekst,
      patreonLink: body.patreonLink,
      nazivSpoljnogLinka: body.nazivSpoljnogLinka,
      spoljniLink: body.spoljniLink,
      status: body.status,
    },
  })

  revalidatePath("/price")
  revalidatePath("/price")
  revalidatePath("/")

  return Response.json(tekstPromena)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const tekst = await prisma.tekst.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!tekst)
    return Response.json(
      { error: "Ovaj tekst nije pronadjen." },
      { status: 404 }
    )

  await prisma.tekst.delete({
    where: {
      id: params.id,
    },
  })

  revalidatePath("/price")

  return Response.json({})
}
