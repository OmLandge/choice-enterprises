import UpdatePassword from "@/components/update-password";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function ChangePassword() {
    useAuthRedirect();

  return (
    <div>
      <UpdatePassword />
    </div>
  )
}