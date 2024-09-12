import { z } from "zod"

export const knjigeSchema = z.object({
  naziv: z.string().min(3).max(150),
  slug: z.string().min(3).max(150),
  sazetak: z.string().min(3).max(3000).optional().or(z.literal("")),
  zanr: z.string().min(3).max(150).optional().or(z.literal("")),
  izdavac: z.string().min(3).max(150).optional().or(z.literal("")),
  zaIzdavaca: z.string().min(3).max(150).optional().or(z.literal("")),
  prevod: z.string().min(3).max(150).optional().or(z.literal("")),
  godina: z.number().optional(),
  prelom: z.string().min(3).max(150).optional().or(z.literal("")),
  lektura: z.string().min(3).max(150).optional().or(z.literal("")),
  urednik: z.string().min(3).max(150).optional().or(z.literal("")),
  dizajnNaslovnice: z.string().min(3).max(150).optional().or(z.literal("")),
  stampa: z.string().min(3).max(150).optional().or(z.literal("")),
  obim: z.string().min(3).max(150).optional().or(z.literal("")),
  isbn: z.string().min(3).max(150).optional().or(z.literal("")),
  kupovina: z.string().min(3).max(150).optional().or(z.literal("")),
})

export const tekstSchema = z.object({
  naslov: z.string().min(3).max(150),
  slug: z.string().min(3).max(150),
  uvod: z.string().min(3).max(2000).optional().or(z.literal("")),
  tekst: z.string().min(50).optional().or(z.literal("")),
  patreonLink: z.string().min(3).max(200).optional().or(z.literal("")),
  nazivSpoljnogLinka: z.string().min(3).max(150).optional().or(z.literal("")),
  spoljniLink: z.string().min(10).max(150).optional().or(z.literal("")),
  status: z.enum(["Objavljeno", "Nacrt"]),
})

export const stranicaSchema = z.object({
  naslov: z.string().min(3).max(150),
  slug: z.string().min(3).max(150),
  uvod: z.string().min(3).max(2000).optional().or(z.literal("")),
  tekst: z.string().min(10).optional().or(z.literal("")),
  status: z.enum(["Objavljeno", "Nacrt"]),
})

export const pressSchema = z.object({
  naslov: z.string().min(3).max(150),
  opis: z.string().min(3).max(1500),
  link: z.string().min(3).max(150),
  status: z.enum(["Objavljeno", "Nacrt"]),
})

export const novostSchema = z.object({
  naslov: z.string().min(3).max(150),
  slug: z.string().min(3).max(150),
  uvod: z.string().min(3).max(2000).optional().or(z.literal("")),
  tekst: z.string().min(5).optional().or(z.literal("")),
  link: z.string().min(10).max(150).optional().or(z.literal("")),
  status: z.enum(["Objavljeno", "Nacrt"]).default("Objavljeno"),
})
