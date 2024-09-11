"use client"

import Input from "./input"
import SimpleMDE from "react-simplemde-editor"
import { createNews } from "@/lib/actions"
import { useActionState } from "react"

const NewsForm = () => {
  const [error, action, isPending] = useActionState(createNews, null)

  return (
    <form action={action}>
      <Input type="text" name="naslov" placeholder="Naslov novosti" />
      <Input
        type="text"
        name="slug"
        placeholder="URL Slug (npr. naslov-novosti, bez č, ć, ž, š, đ)"
      />
      <SimpleMDE placeholder="Uvod novosti" name="uvod" />
      <SimpleMDE placeholder="Tekst novosti" name="tekst" />
    </form>
  )
}
