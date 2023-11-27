import { stranicaSchema } from "@/app/validationSchemas"
import prisma from "@/prisma/client"

export async function GET(request: Request) {
  const stranica = await prisma.stranica.findMany()
  return Response.json(stranica)
}

export async function POST(request: Request) {
  const body = await request.json()
  const validation = stranicaSchema.safeParse(body)

  if (!validation.success)
    return Response.json(validation.error.errors, { status: 400 })

  const stranica = await prisma.stranica.findUnique({
    where: {
      slug: body.slug,
    },
  })

  if (stranica)
    return Response.json({ error: "Stranica vec postoji" }, { status: 400 })

  const novaStranica = await prisma.stranica.create({
    data: {
      naslov: body.naslov,
      slug: body.slug,
      uvod: body.uvod,
      tekst: body.tekst,
      status: body.status,
    },
  })
  return Response.json(novaStranica, { status: 201 })
}
