"use client"
import { novostSchema } from "@/app/validationSchemas"
import { Novost } from "@prisma/client"
import { useState } from "react"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import axios from "axios"
import ErrorMessage from "../../components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import DeleteButton from "../../components/DeleteButton"

type NovostPodaci = z.infer<typeof novostSchema>

const TekstForma = ({ novost }: { novost?: Novost }) => {
  const [error, setError] = useState("")
  const router = useRouter()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NovostPodaci>({
    resolver: zodResolver(novostSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (novost) await axios.patch("/api/novosti/" + novost.slug, data)
      else await axios.post("/api/novosti/", data)
      router.push("/admin/novosti")
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
          <label htmlFor="naslov">Naslov novosti</label>
          <input
            type="text"
            id="naslov"
            defaultValue={novost?.naslov}
            placeholder="Naslov priče"
            {...register("naslov")}
          />
          <ErrorMessage>{errors.naslov?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="slug">
            URL Slug (npr. naslov-novosti, bez č, ć, ž, š, đ)
          </label>
          <input
            type="text"
            id="slug"
            defaultValue={novost?.slug}
            placeholder="URL slug"
            {...register("slug")}
          />
          <ErrorMessage>{errors.slug?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="uvod">Uvod novosti</label>
          <Controller
            name="uvod"
            defaultValue={novost?.uvod || ""}
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Uvod novosti" id="uvod" {...field} />
            )}
          />
          <ErrorMessage>{errors.uvod?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="tekst">Tekst novosti</label>
          <Controller
            name="tekst"
            defaultValue={novost?.tekst || ""}
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Tekst" id="tekst" {...field} />
            )}
          />
          <ErrorMessage>{errors.tekst?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="link">Spoljašnji Link</label>
          <input
            type="text"
            defaultValue={novost?.link || ""}
            placeholder="Link"
            {...register("link")}
          />
          <ErrorMessage>{errors.link?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="status">Status novosti</label>
          <select {...register("status")} id="status">
            <option value="Objavljeno">Objavljena</option>
            <option value="Nacrt">Nacrt</option>
          </select>
          <ErrorMessage>{errors.status?.message}</ErrorMessage>
        </div>
        <div className="form-actions">
          <button className="btn">{novost ? "Izmeni" : "Dodaj"}</button>
          {novost && <DeleteButton id={novost.id} cat="novosti" />}
        </div>
      </form>
    </div>
  )
}

export default TekstForma
