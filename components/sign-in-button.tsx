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
      <Button title="Prijavi se" type="small" submit />
    </form>
  )
}

export default SignInButton
