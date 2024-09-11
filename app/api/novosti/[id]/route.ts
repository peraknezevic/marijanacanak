"use server"

import { novostSchema } from "@/lib/validationSchemas"
import prisma from "@/prisma/client"
import { revalidatePath } from "next/cache"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const novost = await prisma.novost.findUnique({
    where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  const body = await request.json()

  const validation = novostSchema.safeParse(body)

  if (!validation.success)
    return Response.json(validation.error.errors, { status: 400 })

  const novost = await prisma.novost.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!novost)
    return Response.json(
      { error: "Ova novost nije pronadjena" },
      { status: 400 }
    )

  const uredjenaNovost = await prisma.novost.update({
    where: { id: params.id },
    data: {
      naslov: body.naslov,
      slug: body.slug,
      uvod: body.uvod,
      tekst: body.tekst,
      link: body.link,
      status: body.status,
    },
  })

  revalidatePath("/novosti")
  revalidatePath("/")
  revalidatePath(`/novosti/${uredjenaNovost.slug}`)

  return Response.json(uredjenaNovost)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const novost = await prisma.novost.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!novost)
    return Response.json(
      { error: "Ova novost nije pronadjena." },
      { status: 404 }
    )

  await prisma.novost.delete({
    where: {
      id: params.id,
    },
  })

  revalidatePath("/novosti")
  revalidatePath("/")

  return Response.json({})
}
