"use server"
import { pressSchema } from "@/app/validationSchemas"
import prisma from "@/prisma/client"
import { revalidatePath } from "next/cache"

export async function GET(request: Request) {
  const press = await prisma.press.findMany()
  return Response.json(press)
}

export async function POST(request: Request) {
  const body = await request.json()
  const validation = pressSchema.safeParse(body)

  if (!validation.success)
    return Response.json(validation.error.errors, { status: 400 })

  const press = await prisma.press.findUnique({
    where: {
      naslov: body.naslov,
    },
  })

  if (press)
    return Response.json({ error: "Press vec postoji" }, { status: 400 })

  const noviPress = await prisma.press.create({
    data: {
      naslov: body.naslov,
      opis: body.opis,
      link: body.link,
      status: body.status,
    },
  })

  revalidatePath("/press")

  return Response.json(noviPress, { status: 201 })
}
