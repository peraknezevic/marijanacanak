"use client"

import "easymde/dist/easymde.min.css"

import { Controller, useForm } from "react-hook-form"

import Button from "../ui/button"
import FormBlock from "./form-block"
import FormButtons from "./form-buttons"
import FormError from "./form-error"
import FormWrapper from "./form-wrapper"
import SimpleMDE from "react-simplemde-editor"
import { Tekst } from "@prisma/client"
import { tekstSchema } from "@/lib/validationSchemas"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

type Story = z.infer<typeof tekstSchema>

type FormStoryProps = {
  story?: Tekst
  onSubmitAction: (data: Story) => Promise<any>
  onDeleteAction?: () => Promise<any>
}

const FormStory = ({ story, onSubmitAction, onDeleteAction }: FormStoryProps) => {
  const [error, setError] = useState("")
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Story>({
    resolver: zodResolver(tekstSchema),
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
        <label htmlFor="naslov">Naslov priče</label>
        <input
          type="text"
          id="naslov"
          defaultValue={story?.naslov}
          placeholder="Naslov priče"
          {...register("naslov")}
        />
        <FormError>{errors.naslov?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="slug">
          URL Slug (npr. naslov-priče, bez č, ć, ž, š, đ)
        </label>
        <input
          type="text"
          id="slug"
          defaultValue={story?.slug}
          placeholder="URL slug"
          {...register("slug")}
        />
        <FormError>{errors.slug?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="uvod">Uvod priče ili tizer za Patreon</label>
        <Controller
          name="uvod"
          defaultValue={story?.uvod || ""}
          control={control}
          render={({ field }) => (
            <SimpleMDE
              placeholder="Uvod / Tizer za Patreon"
              id="uvod"
              {...field}
            />
          )}
        />
        <FormError>{errors.uvod?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="tekst">Tekst</label>
        <Controller
          name="tekst"
          defaultValue={story?.tekst || ""}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Tekst" id="tekst" {...field} />
          )}
        />
        <FormError>{errors.tekst?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <strong>Ako je priče na Patreonu:</strong>
      </FormBlock>

      <FormBlock>
        <label htmlFor="patreonLink">Patreon Link</label>
        <input
          type="text"
          defaultValue={story?.patreonLink || ""}
          placeholder="Patreon Link"
          {...register("patreonLink")}
        />
        <FormError>{errors.patreonLink?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <strong>Ako je priče na drugom sajtu:</strong>
      </FormBlock>

      <FormBlock>
        <label htmlFor="nazivSpoljnogLinka">Naziv sajta na kom je priča</label>
        <input
          type="tekst"
          id="nazivSpoljnogLinka"
          defaultValue={story?.nazivSpoljnogLinka || ""}
          placeholder="Naziv sajta na kom je priča"
          {...register("nazivSpoljnogLinka")}
        />
        <FormError>{errors.nazivSpoljnogLinka?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="spoljniLink">Link ka priči na drugom sajtu</label>
        <input
          type="tekst"
          id="spoljniLink"
          defaultValue={story?.spoljniLink || ""}
          placeholder="Link ka priči na drugom sajtu"
          {...register("spoljniLink")}
        />
        <FormError>{errors.spoljniLink?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="spoljniLink">Status priče</label>
        <select {...register("status")}>
          <option value="Objavljeno">Objavljena</option>
          <option value="Nacrt">Nacrt</option>
        </select>
        <FormError>{errors.status?.message}</FormError>
      </FormBlock>

      <FormButtons>
        <Button type="regular" title={story ? "Izmeni" : "Dodaj"} submit />
        {story && onDeleteAction && (
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

export default FormStory
