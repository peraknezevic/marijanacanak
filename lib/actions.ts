"use server"

import { knjigeSchema } from "./validationSchemas"

export type State = {
  errors?: {
    naziv?: string[]
    slug?: string[]
    sazetak?: string[]
    zanr?: string[]
    izdavac?: string[]
    zaIzdavaca?: string[]
    prevod?: string[]
    godina?: string[]
    prelom?: string[]
    lektura?: string[]
    urednik?: string[]
    dizajnNaslovnice?: string[]
    stampa?: string[]
    obim?: string[]
    isbn?: string[]
    kupovina?: string[]
  }
  message?: string | null
}

export const creteBook = async (prevState: State, formData: FormData) => {
  const validatedFields = knjigeSchema.safeParse(formData)
}
