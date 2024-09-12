"use client"

import Button from "@/components/ui/button"
import FormBlock from "@/components/forms/form-block"
import FormButtons from "@/components/forms/form-buttons"
import FormWrapper from "@/components/forms/form-wrapper"
import H1 from "@/components/ui/h1"
import { useState } from "react"

const Kontakt = () => {
  const [poruka, setPoruka] = useState("")

  async function handleSubmit(e: any) {
    e.preventDefault()
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "4145ca5b-3e47-4b63-94d5-6752fdd09169",
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value,
      }),
    })
    const result = await response.json()
    if (result.success) {
      setPoruka("Poruka uspešno poslata")
    } else {
      setPoruka("Poruka nije uspešno poslata. Probajte ponovo kasnije.")
    }
    e.target.reset()
  }

  return (
    <div className="max-w-3xl mx-auto my-16 min-h-full">
      <H1 title="Kontakt" />
      <FormWrapper onSubmit={handleSubmit}>
        <FormBlock>
          <label htmlFor="name">Ime</label>
          <input type="text" name="name" required placeholder="Ime" />
        </FormBlock>
        <FormBlock>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="email@example.com"
          />
        </FormBlock>
        <FormBlock>
          <label htmlFor="message">Poruka</label>
          <textarea
            name="message"
            required
            rows={3}
            placeholder="Poruka"
            className="border border-zinc-400 px-2 py-2 text-lg"
          ></textarea>
        </FormBlock>
        {poruka && <p className="font-bold text-xl">{poruka}</p>}
        <FormButtons>
          <Button type="regular" title="Pošalji" submit />
        </FormButtons>
      </FormWrapper>
    </div>
  )
}

export default Kontakt
