"use client"

import "easymde/dist/easymde.min.css"

import { Controller, useForm } from "react-hook-form"
import { createNews, deleteNews, updateNews } from "@/lib/actions"

import Button from "@/components/button"
import FormBlock from "@/components/form-block"
import FormButtons from "@/components/form-buttons"
import FormError from "@/components/form-error"
import FormWrapper from "@/components/form-wrapper"
import { Novost } from "@prisma/client"
import SimpleMDE from "react-simplemde-editor"
import Upload from "@/components/upload"
import { novostSchema } from "@/lib/validationSchemas"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

type News = z.infer<typeof novostSchema>

const FormNews = ({ newsItem }: { newsItem?: Novost }) => {
  const [error, setError] = useState("")

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<News>({
    resolver: zodResolver(novostSchema),
  })

  const onSubmit = handleSubmit(async (news) => {
    try {
      if (newsItem) await updateNews(newsItem.id, news)
      else await createNews(news)
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
    <>
      {error && <FormError>{error}</FormError>}
      <FormWrapper onSubmit={onSubmit}>
        <FormBlock>
          <label htmlFor="naslov">Naslov novosti</label>
          <input
            type="text"
            id="naslov"
            defaultValue={newsItem?.naslov}
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
            defaultValue={newsItem?.slug}
            placeholder="URL slug"
            {...register("slug")}
          />
          <FormError>{errors.slug?.message}</FormError>
        </FormBlock>

        <FormBlock>
          <label htmlFor="uvod">Uvod novosti</label>
          <Controller
            name="uvod"
            defaultValue={newsItem?.uvod || ""}
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
            defaultValue={newsItem?.tekst || ""}
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Tekst" id="tekst" {...field} />
            )}
          />
          <FormError>{errors.tekst?.message}</FormError>
        </FormBlock>

        <Upload />

        <FormBlock>
          <label htmlFor="link">Spoljašnji Link</label>
          <input
            type="text"
            defaultValue={newsItem?.link || ""}
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
          <Button type="regular" title={newsItem ? "Izmeni" : "Dodaj"} submit />
          {newsItem && (
            <Button
              type="delete"
              title="Izbriši"
              onClick={async () => {
                await deleteNews(newsItem.id)
              }}
              button
            />
          )}
        </FormButtons>
      </FormWrapper>
    </>
  )
}

export default FormNews
