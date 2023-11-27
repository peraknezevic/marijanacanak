"use client"
import { stranicaSchema } from "@/app/validationSchemas"
import { Stranica } from "@prisma/client"
import { useState } from "react"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import axios from "axios"
import ErrorMessage from "../../components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"

type StranicaPodaci = z.infer<typeof stranicaSchema>

const StranicaForma = ({ stranica }: { stranica?: Stranica }) => {
  const [error, setError] = useState("")
  const [slugSuggestion, setSlugSuggestion] = useState(stranica?.slug || "")
  const router = useRouter()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StranicaPodaci>({
    resolver: zodResolver(stranicaSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (stranica) await axios.patch("/api/stranice/" + stranica.slug, data)
      else await axios.post("/api/stranice/", data)
      router.push("/admin/stranice")
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
        <div>
          <label htmlFor="naslov">Naslov stranice</label>
          <input
            type="text"
            id="naslov"
            defaultValue={stranica?.naslov}
            placeholder="Naslov stranice"
            {...register("naslov")}
          />
          <ErrorMessage>{errors.naslov?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="slug">
            URL Slug (npr. naslov-teksta, bez č, ć, ž, š, đ)
          </label>
          <input
            type="text"
            id="slug"
            defaultValue={stranica?.slug}
            placeholder="URL slug"
            {...register("slug")}
          />
          <ErrorMessage>{errors.slug?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="uvod">Uvod</label>
          <Controller
            name="uvod"
            defaultValue={stranica?.uvod || ""}
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Uvod" id="uvod" {...field} />
            )}
          />
          <ErrorMessage>{errors.uvod?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="tekst">Tekst</label>
          <Controller
            name="tekst"
            defaultValue={stranica?.tekst || ""}
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Tekst" id="tekst" {...field} />
            )}
          />
          <ErrorMessage>{errors.tekst?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="status">Status stranice</label>
          <select {...register("status")}>
            <option value="Objavljeno">Objavljena</option>
            <option value="Nacrt">Nacrt</option>
          </select>
          <ErrorMessage>{errors.status?.message}</ErrorMessage>
        </div>

        <button className="btn">Dodaj</button>
      </form>
    </div>
  )
}

export default StranicaForma
