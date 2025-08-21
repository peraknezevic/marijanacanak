"use client"

import "easymde/dist/easymde.min.css"

import { Controller, useForm } from "react-hook-form"

import Button from "@/components/ui/button"
import FormBlock from "@/components/forms/form-block"
import FormButtons from "@/components/forms/form-buttons"
import FormError from "@/components/forms/form-error"
import FormWrapper from "@/components/forms/form-wrapper"
import { Novost } from "@prisma/client"
import SimpleMDE from "react-simplemde-editor"
import Upload from "@/components/forms/upload"
import { novostSchema } from "@/lib/validationSchemas"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

type News = z.infer<typeof novostSchema>

type FormNewsProps = {
  news?: Novost
  onSubmitAction: (data: News) => Promise<any>
  onDeleteAction?: () => Promise<any>
}

const FormNews = ({ news, onSubmitAction, onDeleteAction }: FormNewsProps) => {
  const [error, setError] = useState("")

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<News>({
    resolver: zodResolver(novostSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      await onSubmitAction(data)
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError("Validation failed")
        console.log(error.issues)
      }
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  })

  return (
    <FormWrapper onSubmit={onSubmit}>
      <FormBlock>
        <label htmlFor="naslov">Naslov novosti</label>
        <input
          type="text"
          id="naslov"
          defaultValue={news?.naslov}
          placeholder="Naslov novosti"
          {...register("naslov")}
        />
        <FormError>{errors.naslov?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="slug">
          URL Slug (npr. naslov-novosti, bez č, ć, ž, š, đ)
        </label>
        <input
          type="text"
          id="slug"
          defaultValue={news?.slug}
          placeholder="URL slug"
          {...register("slug")}
        />
        <FormError>{errors.slug?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="uvod">Uvod novosti</label>
        <Controller
          name="uvod"
          defaultValue={news?.uvod || ""}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Uvod novosti" id="uvod" {...field} />
          )}
        />
        <FormError>{errors.uvod?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="tekst">Tekst novosti</label>
        <Controller
          name="tekst"
          defaultValue={news?.tekst || ""}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Tekst" id="tekst" {...field} />
          )}
        />
        <FormError>{errors.tekst?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <Upload />
      </FormBlock>

      <FormBlock>
        <label htmlFor="link">Spoljašnji Link</label>
        <input
          type="text"
          defaultValue={news?.link || ""}
          placeholder="Link"
          {...register("link")}
        />
        <FormError>{errors.link?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="status">Status novosti</label>
        <select {...register("status")} id="status">
          <option value="Objavljeno">Objavljena</option>
          <option value="Nacrt">Nacrt</option>
        </select>
        <FormError>{errors.status?.message}</FormError>
      </FormBlock>
      <FormButtons>
        <Button type="regular" title={news ? "Izmeni" : "Dodaj"} submit />
        {news && onDeleteAction && (
          <Button
            type="delete"
            title="Izbriši"
            onClick={async () => {
              await onDeleteAction()
            }}
            button
          />
        )}
      </FormButtons>
      {error && <FormError>{error}</FormError>}
    </FormWrapper>
  )
}

export default FormNews
