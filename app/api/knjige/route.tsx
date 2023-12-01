import { knjigeSchema } from "@/app/validationSchemas"
import prisma from "@/prisma/client"
import { revalidatePath } from "next/cache"

export async function GET(request: Request) {
  const knjiga = await prisma.knjiga.findMany()
  return Response.json(knjiga)
}

export async function POST(request: Request) {
  const body = await request.json()
  const validation = knjigeSchema.safeParse(body)

  if (!validation.success)
    return Response.json(validation.error.errors, { status: 400 })

  const nadjiKnjigu = await prisma.knjiga.findUnique({
    where: {
      slug: body.slug,
    },
  })

  if (nadjiKnjigu)
    return Response.json({ error: "Knjiga vec postoji" }, { status: 400 })

  const novaKnjiga = await prisma.knjiga.create({
    data: {
      naziv: body.naziv,
      slug: body.slug,
      sazetak: body.sazetak,
      zanr: body.zanr,
      izdavac: body.izdavac,
      zaIzdavaca: body.zaIzdavaca,
      prevod: body.prevod,
      urednik: body.urednik,
      lektura: body.lektura,
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

  return Response.json(novaKnjiga, { status: 201 })
}
