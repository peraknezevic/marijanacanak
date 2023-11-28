"use client"
import axios from "axios"
import { useRouter } from "next/navigation"

const DeleteButton = ({ id, cat }: { id: string; cat: string }) => {
  const apiUrl = `/api/${cat}/${id}`
  const redirectUrl = `/admin/${cat === "tekstovi" ? "price" : cat}/`
  const router = useRouter()

  const handleClick = async () => {
    try {
      await axios.delete(apiUrl)
      router.push(redirectUrl)
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button className="btn btn-red" onClick={handleClick}>
      Obriši
    </button>
  )
}

export default DeleteButton
