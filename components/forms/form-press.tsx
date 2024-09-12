"use client"

import "easymde/dist/easymde.min.css"

import { Controller, useForm } from "react-hook-form"
import { createPress, deletePress, updatePress } from "@/lib/actions"

import Button from "@/components/ui/button"
import FormBlock from "./form-block"
import FormButtons from "./form-buttons"
import FormError from "./form-error"
import FormWrapper from "./form-wrapper"
import { Press } from "@prisma/client"
import SimpleMDE from "react-simplemde-editor"
import { pressSchema } from "@/lib/validationSchemas"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

type PressT = z.infer<typeof pressSchema>

const FormPress = ({ pressItem }: { pressItem?: Press }) => {
  const [error, setError] = useState("")

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PressT>({
    resolver: zodResolver(pressSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (pressItem) await updatePress(pressItem.id, data)
      else await createPress(data)
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
        <label htmlFor="naslov">Naslov press teksta</label>
        <input
          type="text"
          id="naslov"
          defaultValue={pressItem?.naslov}
          placeholder="Naslov press teksta"
          {...register("naslov")}
        />
        <FormError>{errors.naslov?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="opis">Opis</label>
        <Controller
          name="opis"
          defaultValue={pressItem?.opis || ""}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Opis" id="opis" {...field} />
          )}
        />
        <FormError>{errors.opis?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="link">Link</label>
        <input
          type="text"
          defaultValue={pressItem?.link || ""}
          placeholder="Link"
          {...register("link")}
        />
        <FormError>{errors.link?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="status">Status teksta</label>
        <select {...register("status")} id="status">
          <option value="Objavljeno">Objavljen</option>
          <option value="Nacrt">Nacrt</option>
        </select>
        <FormError>{errors.status?.message}</FormError>
      </FormBlock>

      <FormButtons>
        <Button type="regular" title={pressItem ? "Izmeni" : "Dodaj"} submit />
        {pressItem && (
          <Button
            type="delete"
            title="Izbriši"
            onClick={async () => {
              await deletePress(pressItem.id)
            }}
            button
          />
        )}
      </FormButtons>
      {error && <FormError>{error}</FormError>}
    </FormWrapper>
  )
}

export default FormPress
