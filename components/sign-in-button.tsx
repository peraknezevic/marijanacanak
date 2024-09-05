import Button from "./button"
import { signIn } from "@/auth"

const SignInButton = () => {
  return (
    <form
      action={async () => {
        "use server"
        await signIn()
      }}
    >
      <Button text="Prijavi se" />
    </form>
  )
}

export default SignInButton
