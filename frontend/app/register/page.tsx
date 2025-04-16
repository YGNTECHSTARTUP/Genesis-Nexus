
import { RegistrationForm } from "../components/registeration-form"

export default function RegisterPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Create an Account</h1>
        <p className="text-muted-foreground text-center mb-8">
          Join our platform and connect with clients or freelancers
        </p>
        <RegistrationForm />
      </div>
    </div>
  )
}
