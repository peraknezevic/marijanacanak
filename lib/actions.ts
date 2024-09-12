"use server"

import {
  knjigaSchema,
  novostSchema,
  pressSchema,
  stranicaSchema,
  tekstSchema,
} from "./validationSchemas"

import { auth } from "@/auth"
import prisma from "@/prisma/client"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export const createNews = async (data: z.infer<typeof novostSchema>) => {
  const session = await auth()
  if (session?.user?.role !== "admin")
    throw new Error("Unauthorized. Nemate administratorska prava, ulogujte se.")

  const validation = novostSchema.safeParse(data)

  if (!validation.success) return { errors: validation.error.errors }

  const exists = await prisma.novost.findUnique({
    where: { slug: data.slug },
  })

  if (exists)
    throw new Error(
      "News with this slug already exists. Vest sa ovim slug-om već postoji."
    )

  try {
    await prisma.novost.create({ data })
    revalidatePath("/novosti")
    revalidatePath("/")
    revalidatePath("/admin")
  } catch (error) {
    throw new Error(
      "Failed to create news item. Nije uspelo kreiranje nove vesti."
    )
  } finally {
    redirect("/admin")
  }
}

export const updateNews = async (
  id: string,
  data: z.infer<typeof novostSchema>
) => {
  const session = await auth()
  if (session?.user?.role !== "admin")
    throw new Error("Unauthorized. Nemate administratorska prava, ulogujte se.")

  const validation = novostSchema.safeParse(data)

  if (!validation.success) return { errors: validation.error.errors }

  const exists = await prisma.novost.findUnique({ where: { id } })

  if (!exists)
    throw new Error("News item could not be found. Nije pronađena vest.")

  try {
    await prisma.novost.update({ where: { id }, data })
    revalidatePath("/novosti")
    revalidatePath("/novosti/" + data.slug)
    revalidatePath("/")
    revalidatePath("/admin")
  } catch (error) {
    throw new Error("Failed to update news item. Nije uspelo ažuriranje vesti.")
  } finally {
    redirect("/admin")
  }
}

export const deleteNews = async (id: string) => {
  const session = await auth()
  if (session?.user?.role !== "admin")
    throw new Error("Unauthorized. Nemate administratorska prava, ulogujte se.")

  try {
    await prisma.novost.delete({ where: { id } })
    revalidatePath("/admin")
    revalidatePath("/novosti/")
    revalidatePath("/")
  } catch (error) {
    throw new Error("Failed to delete news item. Nije uspelo brisanje vesti.")
  } finally {
    redirect("/admin")
  }
}

export const createBook = async (data: z.infer<typeof knjigaSchema>) => {
  const session = await auth()
  if (session?.user?.role !== "admin")
    throw new Error("Unauthorized. Nemate administratorska prava, ulogujte se.")

  const validation = knjigaSchema.safeParse(data)

  if (!validation.success) return { errors: validation.error.errors }

  const exists = await prisma.knjiga.findUnique({ where: { slug: data.slug } })

  if (exists)
    throw new Error(
      "Book with this slug already exists. Knjiga sa ovim slug-om već postoji."
    )

  try {
    await prisma.knjiga.create({ data })
    revalidatePath("/knjige")
    revalidatePath("/admin/knjige")
    revalidatePath("/")
  } catch (error) {
    throw new Error("Failed to create book. Nije uspelo kreiranje knjige.")
  } finally {
    redirect("/admin/knjige")
  }
}

export const updateBook = async (
  id: string,
  data: z.infer<typeof knjigaSchema>
) => {
  const session = await auth()
  if (session?.user?.role !== "admin")
    throw new Error("Unauthorized. Nemate administratorska prava, ulogujte se.")

  const validation = knjigaSchema.safeParse(data)

  if (!validation.success) return { errors: validation.error.errors }

  const exists = await prisma.knjiga.findUnique({ where: { id } })

  if (!exists)
    throw new Error("Book could not be found. Knjiga nije pronađena.")

  try {
    await prisma.knjiga.update({ where: { id }, data })
    revalidatePath("/knjige")
    revalidatePath("/knjige/" + data.slug)
    revalidatePath("/")
    revalidatePath("/admin/knjige")
  } catch (error) {
    throw new Error("Failed to update book. Nije uspelo ažuriranje knjige.")
  } finally {
    redirect("/admin/knjige")
  }
}
export const deleteBook = async (id: string) => {
  const session = await auth()
  if (session?.user?.role !== "admin")
    throw new Error("Unauthorized. Nemate administratorska prava, ulogujte se.")

  try {
    await prisma.knjiga.delete({ where: { id } })
    revalidatePath("/admin/knjige")
    revalidatePath("/knjige/")
    revalidatePath("/")
  } catch (error) {
    throw new Error("Failed to delete book. Nije uspelo brisanje knjige.")
  } finally {
    redirect("/admin/knjige")
  }
}

export const createPress = async (data: z.infer<typeof pressSchema>) => {
  const session = await auth()
  if (session?.user?.role !== "admin")
    throw new Error("Unauthorized. Nemate administratorska prava, ulogujte se.")

  const validation = pressSchema.safeParse(data)

  if (!validation.success) return { errors: validation.error.errors }

  const exists = await prisma.press.findUnique({
    where: { naslov: data.naslov },
  })

  if (exists)
    throw new Error(
      "Press with this title already exists. Press sa ovim naslovom već postoji."
    )

  try {
    await prisma.press.create({ data })
    revalidatePath("/press")
    revalidatePath("/admin/press")
  } catch (error) {
    throw new Error(
      "Failed to create press item. Nije uspelo kreiranje pressa."
    )
  } finally {
    redirect("/admin/press")
  }
}

export const updatePress = async (
  id: string,
  data: z.infer<typeof pressSchema>
) => {
  const session = await auth()
  if (session?.user?.role !== "admin")
    throw new Error("Unauthorized. Nemate administratorska prava, ulogujte se.")

  const validation = pressSchema.safeParse(data)

  if (!validation.success) return { errors: validation.error.errors }

  const exists = await prisma.press.findUnique({ where: { id } })

  if (!exists) throw new Error("Press could not be found. Press nije pronađen.")

  try {
    await prisma.press.update({ where: { id }, data })
    revalidatePath("/press")
    revalidatePath("/admin/press")
  } catch (error) {
    throw new Error(
      "Failed to update press item. Nije uspelo ažuriranje pressa."
    )
  } finally {
    redirect("/admin/press")
  }
}
export const deletePress = async (id: string) => {
  const session = await auth()
  if (session?.user?.role !== "admin")
    throw new Error("Unauthorized. Nemate administratorska prava, ulogujte se.")

  try {
    await prisma.press.delete({ where: { id } })
    revalidatePath("/admin/press")
    revalidatePath("/press/")
  } catch (error) {
    throw new Error("Failed to update press item. Nije uspelo brisanje pressa.")
  } finally {
    redirect("/admin/press")
  }
}

export const createStory = async (data: z.infer<typeof tekstSchema>) => {
  const session = await auth()
  if (session?.user?.role !== "admin")
    throw new Error("Unauthorized. Nemate administratorska prava, ulogujte se.")

  const validation = tekstSchema.safeParse(data)

  if (!validation.success) return { errors: validation.error.errors }

  const exists = await prisma.tekst.findUnique({ where: { slug: data.slug } })

  if (exists)
    throw new Error(
      "Story with this slug already exists. Priča sa ovim slug-om već postoji."
    )

  try {
    await prisma.tekst.create({ data })
    revalidatePath("/price")
    revalidatePath("/")
    revalidatePath("/admin/price")
  } catch (error) {
    throw new Error("Failed to create story. Nije uspelo kreiranje priče.")
  } finally {
    redirect("/admin/price")
  }
}

export const updateStory = async (
  id: string,
  data: z.infer<typeof tekstSchema>
) => {
  const session = await auth()
  if (session?.user?.role !== "admin")
    throw new Error("Unauthorized. Nemate administratorska prava, ulogujte se.")

  const validation = tekstSchema.safeParse(data)

  if (!validation.success) return { errors: validation.error.errors }

  const exists = await prisma.tekst.findUnique({ where: { id } })

  if (!exists)
    throw new Error("Story could not be found. Priča nije pronađena.")

  try {
    await prisma.tekst.update({ where: { id }, data })
    revalidatePath("/price")
    revalidatePath("/price/" + data.slug)
    revalidatePath("/")
    revalidatePath("/admin/price")
  } catch (error) {
    throw new Error("Failed to update story. Nije uspelo ažuriranje priče.")
  } finally {
    redirect("/admin/price")
  }
}
export const deleteStory = async (id: string) => {
  const session = await auth()
  if (session?.user?.role !== "admin")
    throw new Error("Unauthorized. Nemate administratorska prava, ulogujte se.")

  try {
    await prisma.tekst.delete({ where: { id } })
    revalidatePath("/admin/price")
    revalidatePath("/price/")
  } catch (error) {
    throw new Error("Failed to update story. Nije uspelo ažuriranje priče.")
  } finally {
    redirect("/admin/price")
  }
}

export const createPage = async (data: z.infer<typeof stranicaSchema>) => {
  const session = await auth()
  if (session?.user?.role !== "admin")
    throw new Error("Unauthorized. Nemate administratorska prava, ulogujte se.")

  const validation = stranicaSchema.safeParse(data)

  if (!validation.success) return { errors: validation.error.errors }

  const exists = await prisma.stranica.findUnique({
    where: { slug: data.slug },
  })

  if (exists)
    throw new Error(
      "Page with this slug already exists. Stranica sa ovim slug-om već postoji."
    )

  try {
    await prisma.stranica.create({ data })
    revalidatePath("/")
    revalidatePath("/admin/stranice")
  } catch (error) {
    throw new Error("Failed to create page. Nije uspelo kreiranje stranice.")
  } finally {
    redirect("/admin/stranice")
  }
}

export const updatePage = async (
  id: string,
  data: z.infer<typeof stranicaSchema>
) => {
  const session = await auth()
  if (session?.user?.role !== "admin")
    throw new Error("Unauthorized. Nemate administratorska prava, ulogujte se.")

  const validation = stranicaSchema.safeParse(data)

  if (!validation.success) return { errors: validation.error.errors }

  const exists = await prisma.stranica.findUnique({ where: { id } })

  if (!exists)
    throw new Error("Page could not be found. Stranica nije pronađena.")

  try {
    await prisma.stranica.update({ where: { id }, data })
    revalidatePath(data.slug)
    revalidatePath("/")
    revalidatePath("/admin/stranice")
  } catch (error) {
    throw new Error("Failed to update page. Nije uspelo ažuriranje stranice.")
  } finally {
    redirect("/admin/stranice")
  }
}
export const deletePage = async (id: string) => {
  const session = await auth()
  if (session?.user?.role !== "admin")
    throw new Error("Unauthorized. Nemate administratorska prava, ulogujte se.")

  try {
    await prisma.stranica.delete({ where: { id } })
    revalidatePath("/")
    revalidatePath("/admin/stranice")
  } catch (error) {
    throw new Error("Failed to update page. Nije uspelo ažuriranje stranice.")
  } finally {
    redirect("/admin/stranice")
  }
}
