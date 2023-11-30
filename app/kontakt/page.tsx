"use client"

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
    <>
      <h1>Kontakt</h1>
      <form onSubmit={handleSubmit} className="mb-24" id="kontaktForm">
        <div>
          <label htmlFor="name">Ime</label>
          <input type="text" name="name" required placeholder="Ime" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="email@example.com"
          />
        </div>
        <div>
          <label htmlFor="message">Poruka</label>
          <textarea
            name="message"
            required
            rows={3}
            placeholder="Poruka"
          ></textarea>
        </div>
        {poruka && <p className="font-bold text-xl">{poruka}</p>}

        <button type="submit" className="btn">
          Pošalji
        </button>
      </form>
    </>
  )
}

export default Kontakt
