"use client"
import { pressSchema } from "@/app/validationSchemas"
import { Press } from "@prisma/client"
import { useState } from "react"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import axios from "axios"
import ErrorMessage from "../../components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"

type PressPodaci = z.infer<typeof pressSchema>

const PressForma = ({ press }: { press?: Press }) => {
  const [error, setError] = useState("")
  const router = useRouter()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PressPodaci>({
    resolver: zodResolver(pressSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (press) await axios.patch("/api/press/" + press.id, data)
      else await axios.post("/api/press/", data)
      router.push("/admin/press")
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
          <label htmlFor="naslov">Naslov press teksta</label>
          <input
            type="text"
            id="naslov"
            defaultValue={press?.naslov}
            placeholder="Naslov press teksta"
            {...register("naslov")}
          />
          <ErrorMessage>{errors.naslov?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="opis">Opis</label>
          <Controller
            name="opis"
            defaultValue={press?.opis || ""}
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Opis" id="opis" {...field} />
            )}
          />
          <ErrorMessage>{errors.opis?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="link">Link</label>
          <input
            type="text"
            defaultValue={press?.link || ""}
            placeholder="Link"
            {...register("link")}
          />
          <ErrorMessage>{errors.link?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="status">Status teksta</label>
          <select {...register("status")} id="status">
            <option value="Objavljeno">Objavljen</option>
            <option value="Nacrt">Nacrt</option>
          </select>
          <ErrorMessage>{errors.status?.message}</ErrorMessage>
        </div>

        <button className="btn">{press ? "Izmeni" : "Dodaj"}</button>
      </form>
    </div>
  )
}

export default PressForma
