"use client"

import "easymde/dist/easymde.min.css"

import { Controller, useForm } from "react-hook-form"
import { createBook, deleteBook, updateBook } from "@/lib/actions"

import Button from "../ui/button"
import FormBlock from "./form-block"
import FormButtons from "./form-buttons"
import FormError from "./form-error"
import FormWrapper from "./form-wrapper"
import { Knjiga } from "@prisma/client"
import SimpleMDE from "react-simplemde-editor"
import { knjigaSchema } from "@/lib/validationSchemas"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

type Book = z.infer<typeof knjigaSchema>

const FormBook = ({ book }: { book?: Knjiga }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Book>({
    resolver: zodResolver(knjigaSchema),
  })

  const [error, setError] = useState("")

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (book) await updateBook(book.id, data)
      else await createBook(data)
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
        <label htmlFor="naslov">Naslov knjige</label>
        <input
          type="text"
          id="naslov"
          defaultValue={book?.naslov}
          placeholder="Naslov knjige"
          {...register("naslov")}
        />
        <FormError>{errors.naslov?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="slug">
          URL Slug (npr. naslov-knjige, bez č, ć, ž, š, đ)
        </label>
        <input
          type="text"
          id="slug"
          defaultValue={book?.slug || ""}
          placeholder="URL Slug"
          {...register("slug")}
        />
        <FormError>{errors.slug?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="sazetak">Sažetak</label>
        <Controller
          name="sazetak"
          defaultValue={book?.sazetak || ""}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Sazetak" id="sazetak" {...field} />
          )}
        />
        <FormError>{errors.sazetak?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="zanr">Žanr</label>
        <input
          type="text"
          id="zanr"
          defaultValue={book?.zanr || ""}
          placeholder="Žanr"
          {...register("zanr")}
        />
        <FormError>{errors.zanr?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="zaIzdavaca">Za izdavača</label>
        <input
          type="text"
          id="zaIzdavaca"
          defaultValue={book?.zaIzdavaca || ""}
          placeholder="Za izdavača"
          {...register("zaIzdavaca")}
        />
        <FormError>{errors.zaIzdavaca?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="izdavac">Izdavač</label>
        <input
          type="text"
          id="izdavac"
          defaultValue={book?.izdavac || ""}
          placeholder="Izdavač"
          {...register("izdavac")}
        />
        <FormError>{errors.izdavac?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="godina">Godina izdanja (broj, bez tačke)</label>
        <input
          type="number"
          id="godina"
          defaultValue={book?.godina || ""}
          placeholder="Godina izdanja"
          {...register("godina", {
            valueAsNumber: true,
          })}
        />
        <FormError>{errors.godina?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="urednik">Urednik</label>
        <input
          type="text"
          id="urednik"
          defaultValue={book?.urednik || ""}
          placeholder="Urednik"
          {...register("urednik")}
        />
        <FormError>{errors.urednik?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="prevod">Prevod</label>
        <input
          type="text"
          id="prevod"
          defaultValue={book?.prevod || ""}
          placeholder="Prevod"
          {...register("prevod")}
        />
        <FormError>{errors.prevod?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="lektura">Lektura</label>
        <input
          type="text"
          id="lektura"
          defaultValue={book?.lektura || ""}
          placeholder="Lektura i korektura"
          {...register("lektura")}
        />
        <FormError>{errors.lektura?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="prelom">Prelom</label>
        <input
          type="text"
          id="prelom"
          defaultValue={book?.prelom || ""}
          placeholder="Prelom"
          {...register("prelom")}
        />
        <FormError>{errors.prelom?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="dizajnNaslovnice">Ilustracija</label>
        <input
          type="text"
          id="dizajnNaslovnice"
          defaultValue={book?.dizajnNaslovnice || ""}
          placeholder="Ilustracija"
          {...register("dizajnNaslovnice")}
        />
        <FormError>{errors.dizajnNaslovnice?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="stampa">Štampa</label>
        <input
          type="text"
          id="stampa"
          defaultValue={book?.stampa || ""}
          placeholder="Štampa"
          {...register("stampa")}
        />
        <FormError>{errors.stampa?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="obim">Obim</label>
        <input
          type="text"
          id="obim"
          defaultValue={book?.obim || ""}
          placeholder="Obim"
          {...register("obim")}
        />
        <FormError>{errors.obim?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="isbn">ISBN</label>
        <input
          type="text"
          id="isbn"
          defaultValue={book?.isbn || ""}
          placeholder="ISBN"
          {...register("isbn")}
        />
        <FormError>{errors.isbn?.message}</FormError>
      </FormBlock>

      <FormBlock>
        <label htmlFor="kupovina">Link na kupovinu</label>
        <input
          type="text"
          id="kupovina"
          defaultValue={book?.kupovina || ""}
          placeholder="Link na kupovinu"
          {...register("kupovina")}
        />
        <FormError>{errors.kupovina?.message}</FormError>
      </FormBlock>

      <FormButtons>
        <Button type="regular" title={book ? "Izmeni" : "Dodaj"} submit />
        {book && (
          <Button
            type="delete"
            title="Izbriši"
            onClick={async () => {
              await deleteBook(book.id)
            }}
            button
          />
        )}
      </FormButtons>
      {error && <FormError>{error}</FormError>}
    </FormWrapper>
  )
}

export default FormBook
