"use client"

import "easymde/dist/easymde.min.css"

import { Controller, useForm } from "react-hook-form"
import React, { useState } from "react"

import DeleteButton from "../../components/DeleteButton"
import ErrorMessage from "../../components/ErrorMessage"
import { Knjiga } from "@prisma/client"
import SimpleMDE from "react-simplemde-editor"
import axios from "axios"
import { knjigeSchema } from "@/utils/validationSchemas"
import { useRouter } from "next/navigation"
import { z } from "zod"
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (knjiga) await axios.patch("/api/knjige/" + knjiga.id, data)
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
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="naziv">Naslov knjige </label>
          <input
            type="text"
            id="naziv"
            defaultValue={knjiga?.naziv}
            placeholder="Naslov knjige"
            {...register("naziv")}
          />
          <ErrorMessage>{errors.naziv?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="slug">
            URL Slug (npr. naslov-knjige, bez č, ć, ž, š, đ)
          </label>
          <input
            type="text"
            id="slug"
            defaultValue={knjiga?.slug || ""}
            placeholder="URL Slug"
            {...register("slug")}
          />
          <ErrorMessage>{errors.slug?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="sazetak">Sažetak</label>
          <Controller
            name="sazetak"
            defaultValue={knjiga?.sazetak || ""}
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Sazetak" id="sazetak" {...field} />
            )}
          />
          <ErrorMessage>{errors.sazetak?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="zanr">Žanr</label>
          <input
            type="text"
            id="zanr"
            defaultValue={knjiga?.zanr || ""}
            placeholder="Žanr"
            {...register("zanr")}
          />
          <ErrorMessage>{errors.zanr?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="zaIzdavaca">Za izdavača</label>
          <input
            type="text"
            id="zaIzdavaca"
            defaultValue={knjiga?.zaIzdavaca || ""}
            placeholder="Za izdavača"
            {...register("zaIzdavaca")}
          />
          <ErrorMessage>{errors.zaIzdavaca?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="izdavac">Izdavač</label>
          <input
            type="text"
            id="izdavac"
            defaultValue={knjiga?.izdavac || ""}
            placeholder="Izdavač"
            {...register("izdavac")}
          />
          <ErrorMessage>{errors.izdavac?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="godina">Godina izdanja (broj, bez tačke)</label>
          <input
            type="number"
            id="godina"
            defaultValue={knjiga?.godina || ""}
            placeholder="Godina izdanja"
            {...register("godina", {
              valueAsNumber: true,
            })}
          />
          <ErrorMessage>{errors.godina?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="urednik">Urednik</label>
          <input
            type="text"
            id="urednik"
            defaultValue={knjiga?.urednik || ""}
            placeholder="Urednik"
            {...register("urednik")}
          />
          <ErrorMessage>{errors.urednik?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="prevod">Prevod</label>
          <input
            type="text"
            id="prevod"
            defaultValue={knjiga?.prevod || ""}
            placeholder="Prevod"
            {...register("prevod")}
          />
          <ErrorMessage>{errors.prevod?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="lektura">Lektura</label>
          <input
            type="text"
            id="lektura"
            defaultValue={knjiga?.lektura || ""}
            placeholder="Lektura i korektura"
            {...register("lektura")}
          />
          <ErrorMessage>{errors.lektura?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="prelom">Prelom</label>
          <input
            type="text"
            id="prelom"
            defaultValue={knjiga?.prelom || ""}
            placeholder="Prelom"
            {...register("prelom")}
          />
          <ErrorMessage>{errors.prelom?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="dizajnNaslovnice">Ilustracija</label>
          <input
            type="text"
            id="dizajnNaslovnice"
            defaultValue={knjiga?.dizajnNaslovnice || ""}
            placeholder="Ilustracija"
            {...register("dizajnNaslovnice")}
          />
          <ErrorMessage>{errors.dizajnNaslovnice?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="stampa">Štampa</label>
          <input
            type="text"
            id="stampa"
            defaultValue={knjiga?.stampa || ""}
            placeholder="Štampa"
            {...register("stampa")}
          />
          <ErrorMessage>{errors.stampa?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="obim">Obim</label>
          <input
            type="text"
            id="obim"
            defaultValue={knjiga?.obim || ""}
            placeholder="Obim"
            {...register("obim")}
          />
          <ErrorMessage>{errors.obim?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="isbn">ISBN</label>
          <input
            type="text"
            id="isbn"
            defaultValue={knjiga?.isbn || ""}
            placeholder="ISBN"
            {...register("isbn")}
          />
          <ErrorMessage>{errors.isbn?.message}</ErrorMessage>
        </div>

        <div>
          <label htmlFor="kupovina">Link na kupovinu</label>
          <input
            type="text"
            id="kupovina"
            defaultValue={knjiga?.kupovina || ""}
            placeholder="Link na kupovinu"
            {...register("kupovina")}
          />
          <ErrorMessage>{errors.kupovina?.message}</ErrorMessage>
        </div>

        <div className="form-actions">
          <button className="btn">{knjiga ? "Izmeni" : "Dodaj"}</button>
          {knjiga && <DeleteButton id={knjiga.id} cat="knjige" />}
        </div>
      </form>
    </div>
  )
}

export default KnjigaForma
