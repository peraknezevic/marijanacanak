"use client"

import "easymde/dist/easymde.min.css"

import { Controller, useForm } from "react-hook-form"

import Button from "../ui/button"
import FormBlock from "./form-block"
import FormButtons from "./form-buttons"
import FormError from "./form-error"
import FormWrapper from "./form-wrapper"
import SimpleMDE from "react-simplemde-editor"
import { Stranica } from "@prisma/client"
import { stranicaSchema } from "@/lib/validationSchemas"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

type Page = z.infer<typeof stranicaSchema>

type FormPageProps = {
  page?: Stranica
  onSubmitAction: (data: Page) => Promise<any>
  onDeleteAction?: () => Promise<any>
}

const FormPage = ({ page, onSubmitAction, onDeleteAction }: FormPageProps) => {
  const [error, setError] = useState("")

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Page>({
    resolver: zodResolver(stranicaSchema),
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
        <label htmlFor="naslov">Naslov stranice</label>
        <input
          type="text"
          id="naslov"
          defaultValue={page?.naslov}
          placeholder="Naslov stranice"
          {...register("naslov")}
        />
        <FormError>{errors.naslov?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="slug">
          URL Slug (npr. naslov-teksta, bez č, ć, ž, š, đ)
        </label>
        <input
          type="text"
          id="slug"
          defaultValue={page?.slug}
          placeholder="URL slug"
          {...register("slug")}
        />
        <FormError>{errors.slug?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="uvod">Uvod</label>
        <Controller
          name="uvod"
          defaultValue={page?.uvod || ""}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Uvod" id="uvod" {...field} />
          )}
        />
        <FormError>{errors.uvod?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="tekst">Tekst</label>
        <Controller
          name="tekst"
          defaultValue={page?.tekst || ""}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Tekst" id="tekst" {...field} />
          )}
        />
        <FormError>{errors.tekst?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="status">Status stranice</label>
        <select {...register("status")}>
          <option value="Objavljeno">Objavljena</option>
          <option value="Nacrt">Nacrt</option>
        </select>
        <FormError>{errors.status?.message}</FormError>
      </FormBlock>
      <FormButtons>
        <Button type="regular" title={page ? "Izmeni" : "Dodaj"} submit />
        {page && onDeleteAction && (
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

export default FormPage
