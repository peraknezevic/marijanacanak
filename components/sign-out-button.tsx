import Button from "./button"
import { signOut } from "@/auth"

const SignOutButton = () => {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button text="Odjavi se" />
    </form>
  )
}

export default SignOutButton
