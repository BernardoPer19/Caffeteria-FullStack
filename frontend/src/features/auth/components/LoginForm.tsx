import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { zodResolver } from "../../../utils/resolverZod";
import { loginRequest } from "../api/AuthRequest";
import { LoginSchema, type LoginUserType } from "../schema/LoginSchema";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginUserType>({
    resolver: zodResolver(LoginSchema),
  });

  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      toast.success(data.message);
      console.log(data.bienvenida); 
      reset();
    },
    onError: (error: Error) => {
      console.log("Error en login:", error.message);
      toast.error(error.message);
    },
  });

  const onSubmit = (data: LoginUserType) => {
    console.log("Datos enviados:", data); // Para verificar los datos enviados
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-[url('/coffee-bg.jpg')] bg-cover bg-center flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#f6f1eb] rounded-2xl shadow-xl p-8 w-full max-w-md border border-[#c8b6a6]"
      >
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
      </form>
    </div>
  );
}
