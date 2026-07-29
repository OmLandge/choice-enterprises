import LoginForm from "@/components/login-form";
import { MoveBack } from "@/components/move-back";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function Login() {
    useAuthRedirect();

  return (
    <div className="relative">
      <MoveBack />
      <LoginForm />
    </div>
  )
}