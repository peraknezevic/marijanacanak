"use server"
import { pressSchema } from "@/app/validationSchemas"
import prisma from "@/prisma/client"
import { revalidatePath } from "next/cache"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const press = await prisma.press.findUnique({
    where: { id: params.id },
  })
  if (!press)
    return Response.json(
      { error: "Ovaj press nije pronadjen" },
      { status: 404 }
    )
  return Response.json(press)
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()

  const validation = pressSchema.safeParse(body)

  if (!validation.success)
    return Response.json(validation.error.errors, { status: 400 })

  const press = await prisma.press.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!press)
    return Response.json(
      { error: "Ovaj press nije pronadjen." },
      { status: 400 }
    )

  const updatePress = await prisma.press.update({
    where: { id: params.id },
    data: {
      naslov: body.naslov,
      opis: body.opis,
      link: body.link,
      status: body.status,
    },
  })

  revalidatePath("/press")

  return Response.json(updatePress)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const press = await prisma.press.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!press)
    return Response.json(
      { error: "Ovaj press nije pronadjen." },
      { status: 404 }
    )

  await prisma.press.delete({
    where: {
      id: params.id,
    },
  })

  revalidatePath("/press")

  return Response.json({})
}
