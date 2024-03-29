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
import DeleteButton from "../../components/DeleteButton"

type TekstPodaci = z.infer<typeof tekstSchema>

const TekstForma = ({ tekst }: { tekst?: Tekst }) => {
  const [error, setError] = useState("")
  const router = useRouter()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TekstPodaci>({
    resolver: zodResolver(tekstSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (tekst) await axios.patch("/api/tekstovi/" + tekst.id, data)
      else await axios.post("/api/tekstovi/", data)
      router.push("/admin/price")
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
          <label htmlFor="naslov">Naslov priče</label>
          <input
            type="text"
            id="naslov"
            defaultValue={tekst?.naslov}
            placeholder="Naslov priče"
            {...register("naslov")}
          />
          <ErrorMessage>{errors.naslov?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="slug">
            URL Slug (npr. naslov-priče, bez č, ć, ž, š, đ)
          </label>
          <input
            type="text"
            id="slug"
            defaultValue={tekst?.slug}
            placeholder="URL slug"
            {...register("slug")}
          />
          <ErrorMessage>{errors.slug?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="uvod">Uvod priče ili tizer za Patreon</label>
          <Controller
            name="uvod"
            defaultValue={tekst?.uvod || ""}
            control={control}
            render={({ field }) => (
              <SimpleMDE
                placeholder="Uvod / Tizer za Patreon"
                id="uvod"
                {...field}
              />
            )}
          />
          <ErrorMessage>{errors.uvod?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="tekst">Tekst</label>
          <Controller
            name="tekst"
            defaultValue={tekst?.tekst || ""}
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Tekst" id="tekst" {...field} />
            )}
          />
          <ErrorMessage>{errors.tekst?.message}</ErrorMessage>
        </div>

        <div>
          <strong>Ako je priče na Patreonu:</strong>
        </div>

        <div>
          <label htmlFor="patreonLink">Patreon Link</label>
          <input
            type="text"
            defaultValue={tekst?.patreonLink || ""}
            placeholder="Patreon Link"
            {...register("patreonLink")}
          />
          <ErrorMessage>{errors.patreonLink?.message}</ErrorMessage>
        </div>

        <div>
          <strong>Ako je priče na drugom sajtu:</strong>
        </div>

        <div>
          <label htmlFor="nazivSpoljnogLinka">
            Naziv sajta na kom je priča
          </label>
          <input
            type="tekst"
            id="nazivSpoljnogLinka"
            defaultValue={tekst?.nazivSpoljnogLinka || ""}
            placeholder="Naziv sajta na kom je priča"
            {...register("nazivSpoljnogLinka")}
          />
          <ErrorMessage>{errors.nazivSpoljnogLinka?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="spoljniLink">Link ka priči na drugom sajtu</label>
          <input
            type="tekst"
            id="spoljniLink"
            defaultValue={tekst?.spoljniLink || ""}
            placeholder="Link ka priči na drugom sajtu"
            {...register("spoljniLink")}
          />
          <ErrorMessage>{errors.spoljniLink?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="spoljniLink">Status priče</label>
          <select {...register("status")}>
            <option value="Objavljeno">Objavljena</option>
            <option value="Nacrt">Nacrt</option>
          </select>
          <ErrorMessage>{errors.status?.message}</ErrorMessage>
        </div>

        <div className="form-actions">
          <button className="btn">{tekst ? "Izmeni" : "Dodaj"}</button>
          {tekst && <DeleteButton id={tekst.id} cat="tekstovi" />}
        </div>
      </form>
    </div>
  )
}

export default TekstForma
