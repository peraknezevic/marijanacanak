"use client"
import { knjigeSchema } from "@/app/validationSchemas"
import { Knjiga } from "@prisma/client"
import React, { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import axios from "axios"
import ErrorMessage from "../../components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"

type KnjigaPodaci = z.infer<typeof knjigeSchema>

const KnjigaForma = ({ knjiga }: { knjiga?: Knjiga }) => {
  const router = useRouter()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<KnjigaPodaci>({
    resolver: zodResolver(knjigeSchema),
  })

  const [error, setError] = useState("")
  const [slugSuggestion, setSlugSuggestion] = useState("")

  const makeSlug = (text: string) => {
    return text
      .replaceAll(" ", "-")
      .replaceAll("'", "")
      .replaceAll('"', "")
      .toLowerCase()
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (knjiga) await axios.patch("/api/knjige/" + knjiga.slug, data)
      else await axios.post("/api/knjige/", data)
      router.push("/admin/knjige")
      router.refresh()
    } catch (error) {
      setError("Unexpected error accured")
    }
  })

  return (
    <div>
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}
      <form
        className="mx-auto flex max-w-2xl flex-col space-y-4"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          defaultValue={knjiga?.naziv}
          placeholder="Naziv knjige"
          {...register("naziv", {
            onChange: (e) => setSlugSuggestion(makeSlug(e.target.value)),
          })}
        />
        <ErrorMessage>{errors.naziv?.message}</ErrorMessage>

        <input
          type="text"
          defaultValue={knjiga?.slug || slugSuggestion}
          placeholder="Slug"
          {...register("slug")}
        />
        <ErrorMessage>{errors.slug?.message}</ErrorMessage>

        <input
          type="text"
          defaultValue={knjiga?.zanr || ""}
          placeholder="Žanr"
          {...register("zanr")}
        />
        <ErrorMessage>{errors.zanr?.message}</ErrorMessage>

        <input
          type="text"
          defaultValue={knjiga?.izdavac || ""}
          placeholder="Izdavač"
          {...register("izdavac")}
        />
        <ErrorMessage>{errors.izdavac?.message}</ErrorMessage>

        <input
          type="text"
          defaultValue={knjiga?.prevod || ""}
          placeholder="Prevod"
          {...register("prevod")}
        />
        <ErrorMessage>{errors.prevod?.message}</ErrorMessage>

        <input
          type="number"
          defaultValue={knjiga?.godina || ""}
          placeholder="Godina izdanja"
          {...register("godina", {
            valueAsNumber: true,
          })}
        />
        <ErrorMessage>{errors.godina?.message}</ErrorMessage>

        <input
          type="text"
          defaultValue={knjiga?.prevod || ""}
          placeholder="Prevod"
          {...register("prevod")}
        />
        <ErrorMessage>{errors.prevod?.message}</ErrorMessage>

        <input
          type="text"
          defaultValue={knjiga?.prelom || ""}
          placeholder="Prelom"
          {...register("prelom")}
        />
        <ErrorMessage>{errors.prelom?.message}</ErrorMessage>

        <input
          type="text"
          defaultValue={knjiga?.dizajnNaslovnice || ""}
          placeholder="Dizajn naslovnice"
          {...register("dizajnNaslovnice")}
        />
        <ErrorMessage>{errors.dizajnNaslovnice?.message}</ErrorMessage>

        <input
          type="text"
          defaultValue={knjiga?.stampa || ""}
          placeholder="Štampa"
          {...register("stampa")}
        />
        <ErrorMessage>{errors.stampa?.message}</ErrorMessage>

        <input
          type="text"
          defaultValue={knjiga?.obim || ""}
          placeholder="Obim"
          {...register("obim")}
        />
        <ErrorMessage>{errors.obim?.message}</ErrorMessage>

        <input
          type="text"
          defaultValue={knjiga?.isbn || ""}
          placeholder="ISBN"
          {...register("isbn")}
        />
        <ErrorMessage>{errors.isbn?.message}</ErrorMessage>

        <input
          type="text"
          defaultValue={knjiga?.kupovina || ""}
          placeholder="Link na kupovinu"
          {...register("kupovina")}
        />
        <ErrorMessage>{errors.kupovina?.message}</ErrorMessage>

        <button className="btn">Dodaj</button>
      </form>
    </div>
  )
}

export default KnjigaForma
