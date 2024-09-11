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

export const getPages = async () =>
  await prisma.stranica.findMany({ orderBy: { createdAt: "desc" } })

export const getPageBySlug = async (slug: string) =>
  await prisma.stranica.findUnique({ where: { slug } })

export const getStories = async () =>
  await prisma.tekst.findMany({ orderBy: { createdAt: "desc" } })

export const getPublishedStories = async () =>
  await prisma.tekst.findMany({
    where: {
      status: "Objavljeno",
    },
    orderBy: {
      createdAt: "desc",
    },
  })

export const getLatestPublishedStories = async (num: number) =>
  await prisma.tekst.findMany({
    where: {
      status: "Objavljeno",
    },
    take: num,
    orderBy: { createdAt: "desc" },
  })

export const getStoryBySlug = async (slug: string) =>
  await prisma.tekst.findUnique({ where: { slug } })

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

export const getNewsItem = async (slug: string) =>
  await prisma.novost.findUnique({
    where: { slug },
  })

export const getPress = async () =>
  await prisma.press.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
