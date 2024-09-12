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
      <Button title="Odjavi se" type="small" submit />
    </form>
  )
}

export default SignOutButton
