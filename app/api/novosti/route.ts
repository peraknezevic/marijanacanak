"use server"

import { novostSchema } from "@/utils/validationSchemas"
import prisma from "@/prisma/client"
import { revalidatePath } from "next/cache"

export async function GET(request: Request) {
  const novosti = await prisma.novost.findMany()
  return Response.json(novosti)
}

export async function POST(request: Request) {
  const body = await request.json()
  const validation = novostSchema.safeParse(body)

  if (!validation.success)
    return Response.json(validation.error.errors, { status: 400 })

  const novost = await prisma.novost.findUnique({
    where: {
      slug: body.slug,
    },
  })

  if (novost)
    return Response.json({ error: "Novost vec postoji" }, { status: 400 })

  const novaObjava = await prisma.novost.create({
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

  return Response.json(novaObjava, { status: 201 })
}
