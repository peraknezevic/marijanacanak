"use client"
import { tekstSchema } from "@/app/validationSchemas"
import { Tekst } from "@prisma/client"
import { useState } from "react"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import axios from "axios"
import ErrorMessage from "../../components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"

type TekstPodaci = z.infer<typeof tekstSchema>

const TekstForma = ({ tekst }: { tekst?: Tekst }) => {
  const router = useRouter()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TekstPodaci>({
    resolver: zodResolver(tekstSchema),
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
      if (tekst) await axios.patch("/api/tekstovi/" + tekst.slug, data)
      else await axios.post("/api/tekstovi/", data)
      router.push("/admin/tekstovi")
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
      <form onSubmit={onSubmit}>
        <input
          type="text"
          defaultValue={tekst?.naslov}
          placeholder="Naslov teksta"
          {...register("naslov", {
            onChange: (e) => setSlugSuggestion(makeSlug(e.target.value)),
          })}
        />
        <ErrorMessage>{errors.naslov?.message}</ErrorMessage>

        <input
          type="text"
          defaultValue={tekst?.slug || slugSuggestion}
          placeholder="URL slug"
          {...register("slug")}
        />
        <ErrorMessage>{errors.slug?.message}</ErrorMessage>

        <Controller
          name="uvod"
          defaultValue={tekst?.uvod || ""}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Uvod / Tizer za Patreon" {...field} />
          )}
        />
        <ErrorMessage>{errors.uvod?.message}</ErrorMessage>

        <Controller
          name="tekst"
          defaultValue={tekst?.tekst || ""}
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Tekst" {...field} />}
        />
        <ErrorMessage>{errors.tekst?.message}</ErrorMessage>

        <input
          type="text"
          defaultValue={tekst?.patreonLink || ""}
          placeholder="Patreon Link"
          {...register("patreonLink")}
        />
        <ErrorMessage>{errors.patreonLink?.message}</ErrorMessage>

        <input
          type="tekst"
          defaultValue={tekst?.spoljniLink || ""}
          placeholder="Link ka tekstu na drugom sajtu"
          {...register("spoljniLink")}
        />
        <ErrorMessage>{errors.spoljniLink?.message}</ErrorMessage>

        <select {...register("status")}>
          <option value="Objavljeno">Objavljeno</option>
          <option value="Nacrt">Nacrt</option>
        </select>
        <ErrorMessage>{errors.status?.message}</ErrorMessage>

        <button className="btn">Dodaj</button>
      </form>
    </div>
  )
}

export default TekstForma
