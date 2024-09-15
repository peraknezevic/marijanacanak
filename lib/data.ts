"use server"

import prisma from "@/prisma/client"

// Books

export const getBooks = async () =>
  await prisma.knjiga.findMany({
    orderBy: {
      godina: "desc",
    },
    select: {
      id: true,
      naslov: true,
    },
  })

export const getPublishedBooks = async () =>
  await prisma.knjiga.findMany({
    where: {
      status: "Objavljeno",
    },
    orderBy: {
      godina: "desc",
    },
  })

export const getBookBySlug = async (slug: string) =>
  await prisma.knjiga.findUnique({ where: { slug } })

export const getBookById = async (id: string) =>
  await prisma.knjiga.findUnique({ where: { id } })

// Pages

export const getPages = async () =>
  await prisma.stranica.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, naslov: true },
  })

export const getPageBySlug = async (slug: string) =>
  await prisma.stranica.findUnique({ where: { slug } })

export const getPageById = async (id: string) =>
  await prisma.stranica.findUnique({ where: { id } })

// Stories

export const getStories = async () =>
  await prisma.tekst.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      naslov: true,
    },
  })

export const getPublishedStories = async () =>
  await prisma.tekst.findMany({
    where: {
      status: "Objavljeno",
    },
    orderBy: {
      createdAt: "desc",
    },
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
    select: {
      id: true,
      naslov: true,
    },
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
    select: {
      id: true,
      naslov: true,
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

// Hompage

export const getHomepageData = async () =>
  await Promise.all([
    prisma.stranica.findUnique({
      where: { slug: "biografija" },
      select: { uvod: true },
    }),
    prisma.novost.findMany({
      where: {
        status: "Objavljeno", // Published
      },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        slug: true,
        naslov: true,
      },
    }),
    await prisma.tekst.findMany({
      where: {
        status: "Objavljeno",
      },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        slug: true,
        naslov: true,
        patreonLink: true,
        spoljniLink: true,
      },
    }),
    prisma.knjiga.findMany({
      take: 5,
      orderBy: { godina: "desc" },
      select: {
        id: true,
        slug: true,
        naslov: true,
        izdavac: true,
      },
    }),
  ])
