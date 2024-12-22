import LoginForm from "@/components/login-form";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function Login() {
    useAuthRedirect();

  return (
    <div>
      <LoginForm />
    </div>
  )
}