import { tekstSchema } from "@/app/validationSchemas"
import prisma from "@/prisma/client"

export async function GET(request: Request) {
  const tekst = await prisma.tekst.findMany()
  return Response.json(tekst)
}

export async function POST(request: Request) {
  const body = await request.json()
  const validation = tekstSchema.safeParse(body)

  if (!validation.success)
    return Response.json(validation.error.errors, { status: 400 })

  const nadjiTekst = await prisma.tekst.findUnique({
    where: {
      slug: body.slug,
    },
  })

  if (nadjiTekst)
    return Response.json({ error: "Tekst vec postoji" }, { status: 400 })

  const noviTekst = await prisma.tekst.create({
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
  return Response.json(noviTekst, { status: 201 })
}
