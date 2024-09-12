"use server"

import prisma from "@/prisma/client"

// Books

export const getBooks = async () =>
  await prisma.knjiga.findMany({
    orderBy: {
      godina: "desc",
    },
  })

export const getLatestBooks = async (num: number) => {
  return await prisma.knjiga.findMany({
    take: num,
    orderBy: { godina: "desc" },
  })
}

export const getBookBySlug = async (slug: string) =>
  await prisma.knjiga.findUnique({ where: { slug } })

export const getBookById = async (id: string) =>
  await prisma.knjiga.findUnique({ where: { id } })

// Pages

export const getPages = async () =>
  await prisma.stranica.findMany({ orderBy: { createdAt: "desc" } })

export const getPageBySlug = async (slug: string) =>
  await prisma.stranica.findUnique({ where: { slug } })

export const getPageById = async (id: string) =>
  await prisma.stranica.findUnique({ where: { id } })

// Stories

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

export const getStoryById = async (id: string) =>
  await prisma.tekst.findUnique({ where: { id } })

// News

export const getNews = async () =>
  await prisma.novost.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

export const getLatestPublishedNews = async (num: number) =>
  await prisma.novost.findMany({
    where: {
      status: "Objavljeno", // Published
    },
    take: num,
    orderBy: { createdAt: "desc" },
  })

export const getPublishedNews = async () =>
  await prisma.novost.findMany({
    where: {
      status: "Objavljeno",
    },
    orderBy: {
      createdAt: "desc",
    },
  })

export const getNewsBySlug = async (slug: string) =>
  await prisma.novost.findUnique({
    where: { slug },
  })

export const getNewsById = async (id: string) =>
  await prisma.novost.findUnique({
    where: { id },
  })

// Press

export const getPress = async () =>
  await prisma.press.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

export const getPublishedPress = async () =>
  await prisma.press.findMany({
    where: {
      status: "Objavljeno",
    },
    orderBy: {
      createdAt: "desc",
    },
  })

export const getPressItemById = async (id: string) =>
  await prisma.press.findUnique({
    where: { id },
  })
