import { Toaster } from "sonner";
import { RegisterForm } from "../components/RegisterForm";

function RegisterPage() {
  return (
    <div>
      <RegisterForm />
      <Toaster />
    </div>
  );
}

export default RegisterPage;
