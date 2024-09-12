"use server"

import { novostSchema, pressSchema } from "./validationSchemas"

import { auth } from "@/auth"
import prisma from "@/prisma/client"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export const createNews = async (news: z.infer<typeof novostSchema>) => {
  const session = await auth()
  if (session?.user?.role !== "admin") throw new Error("Unauthorized")

  const validation = novostSchema.safeParse(news)

  if (!validation.success) return { errors: validation.error.errors }

  const exists = await prisma.novost.findUnique({
    where: { slug: validation.data.slug },
  })

  if (exists) throw new Error("News with this slug already exists")

  try {
    await prisma.novost.create({
      data: news,
    })
    revalidatePath("/novosti")
    revalidatePath("/")
    revalidatePath("/admin")
  } catch (error) {
    throw new Error("Failed to create news item")
  } finally {
    redirect("/admin")
  }
}

export const updateNews = async (
  id: string,
  news: z.infer<typeof novostSchema>
) => {
  const session = await auth()
  if (session?.user?.role !== "admin") throw new Error("Unauthorized")

  const validation = novostSchema.safeParse(news)

  if (!validation.success) return { errors: validation.error.errors }

  const exists = await prisma.novost.findUnique({
    where: {
      id,
    },
  })

  if (!exists) throw new Error("News item could not be found")

  try {
    await prisma.novost.update({ where: { id }, data: validation.data })
    revalidatePath("/novosti")
    revalidatePath("/novosti/" + validation.data.slug)
    revalidatePath("/")
    revalidatePath("/admin")
    revalidatePath("/admin/novosti/" + id)
  } catch (error) {
    throw new Error("Failed to update news item")
  } finally {
    redirect("/admin")
  }
}

export const deleteNews = async (id: string) => {
  const session = await auth()
  if (session?.user?.role !== "admin") throw new Error("Unauthorized")

  try {
    await prisma.novost.delete({ where: { id } })
    revalidatePath("/admin")
    revalidatePath("/novosti/" + id)
    revalidatePath("/novosti/")
    revalidatePath("/")
  } catch (error) {
    throw new Error("Failed to delete news item")
  } finally {
    redirect("/admin")
  }
}

export const createBook = async () => {}

export const createPress = async (press: z.infer<typeof pressSchema>) => {
  const session = await auth()
  if (session?.user?.role !== "admin") throw new Error("Unauthorized")

  const validation = pressSchema.safeParse(press)

  if (!validation.success) return { errors: validation.error.errors }

  const exists = await prisma.press.findUnique({
    where: { naslov: press.naslov },
  })

  if (exists) throw new Error("Press with this title already exists")

  try {
    await prisma.press.create({
      data: press,
    })
    revalidatePath("/press")
    revalidatePath("/admin/press")
  } catch (error) {
    throw new Error("Failed to create press item")
  } finally {
    redirect("/admin/press")
  }
}

export const updatePress = async (
  id: string,
  press: z.infer<typeof pressSchema>
) => {
  const session = await auth()
  if (session?.user?.role !== "admin") throw new Error("Unauthorized")

  const validation = pressSchema.safeParse(press)

  if (!validation.success) return { errors: validation.error.errors }

  const exists = await prisma.press.findUnique({
    where: {
      id,
    },
  })

  if (!exists) throw new Error("News item could not be found")

  try {
    await prisma.press.update({ where: { id }, data: press })
    revalidatePath("/press")
    revalidatePath("/admin/press")
  } catch (error) {
    throw new Error("Failed to update press item")
  } finally {
    redirect("/admin/press")
  }
}
export const deletePress = async (id: string) => {
  const session = await auth()
  if (session?.user?.role !== "admin") throw new Error("Unauthorized")

  try {
    await prisma.press.delete({ where: { id } })
    revalidatePath("/admin/press")
    revalidatePath("/press/")
  } catch (error) {
    throw new Error("Failed to update press item")
  } finally {
    redirect("/admin/press")
  }
}
