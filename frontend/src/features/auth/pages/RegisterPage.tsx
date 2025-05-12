import { Toaster } from "sonner";
import { RegisterForm } from "../components/RegisterForm";

function RegisterPage() {
  return (
    <div>
      <RegisterForm />
      <Toaster
        theme="dark"
        closeButton
        position="top-right"
        className="bg-red-300"
      />
    </div>
  );
}

export default RegisterPage;
