import { knjigeSchema } from "@/app/validationSchemas"
import prisma from "@/prisma/client"

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
  return Response.json(novaKnjiga, { status: 201 })
}
