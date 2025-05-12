import { useForm } from "react-hook-form";
import { Toaster } from "sonner";
import { zodResolver } from "../../../utils/resolverZod";
import { LoginSchema, type LoginUserType } from "../schema/LoginSchema";
import { Link } from "react-router-dom";
import { useAuthForm } from "../hooks/useAuth";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginUserType>({
    resolver: zodResolver(LoginSchema),
  });

  const {
    login: { loginMutate },
  } = useAuthForm();

  const onSubmit = (data: LoginUserType) => {
    loginMutate(data);
    reset();
  };

  return (
    <div className="min-h-screen bg-[url('/coffee-bg.jpg')] bg-cover bg-center flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#f6f1eb] rounded-2xl shadow-xl p-8 w-full max-w-md border border-[#c8b6a6]"
      >
        <Toaster
          theme="dark"
          closeButton
          position="top-right"
          className="bg-red-300"
          duration={3000}
        />
        <h2 className="text-3xl font-bold text-[#5c4033] mb-6 text-center">
          Iniciar Sesión
        </h2>

        <div className="mb-4">
          <label className="block text-[#5c4033] font-medium mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-2 border border-[#d3c0ad] rounded focus:outline-none focus:ring focus:ring-[#a67c52]"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-[#5c4033] font-medium mb-1">
            Contraseña
          </label>
          <input
            type="password"
            {...register("contraseña")}
            className="w-full px-4 py-2 border border-[#d3c0ad] rounded focus:outline-none focus:ring focus:ring-[#a67c52]"
          />
          {errors.contraseña && (
            <p className="text-red-600 text-sm mt-1">
              {errors.contraseña.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#a67c52] hover:bg-[#8b5e3c] text-white font-semibold py-2 rounded transition duration-200"
        >
          {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>

        <p className="text-[#a67c52] font-semibold text-[16px] text-center mt-2">
          No tiene una cuenta?
          {
            <Link to="/register">
              <span className=" text-[#a67c52] underline rounded-md m-auto px-1 py-1">
                Registrate
              </span>
            </Link>
          }
        </p>
      </form>
    </div>
  );
}
