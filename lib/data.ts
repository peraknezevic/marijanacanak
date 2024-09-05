"use server"

import prisma from "@/prisma/client"

export const getBooks = async () =>
  await prisma.knjiga.findMany({
    orderBy: {
      godina: "desc",
    },
  })

export const getBookBySlug = async (slug: string) =>
  await prisma.knjiga.findUnique({ where: { slug } })

export const getLatestBooks = async (num: number) => {
  return await prisma.knjiga.findMany({
    take: num,
    orderBy: { godina: "desc" },
  })
}

export const getBio = async () =>
  await prisma.stranica.findUnique({ where: { slug: "biografija" } })

export const getLatestStories = async (num: number) =>
  await prisma.tekst.findMany({
    take: num,
    orderBy: { createdAt: "desc" },
  })

export const getStories = async () =>
  await prisma.tekst.findMany({
    where: {
      status: "Objavljeno",
    },
    orderBy: {
      createdAt: "desc",
    },
  })

export const getLatestNews = async (num: number) =>
  await prisma.novost.findMany({
    take: num,
    orderBy: { createdAt: "desc" },
  })

export const getNews = async () =>
  await prisma.novost.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

export const getPress = async () =>
  await prisma.press.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
