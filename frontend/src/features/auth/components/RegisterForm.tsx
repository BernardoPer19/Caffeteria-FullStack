import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { zodResolver } from "../../../utils/resolverZod";
import type { PublicRegisterType } from "../schema/RegisterSchema";
import { publicRegisterRequest } from "../api/AuthRequest";

// Esquema con zod
const registerSchema = z.object({
  nombre: z.string().min(3, "Nombre requerido"),
  email: z.string().email("Correo inválido"),
  contraseña: z.string().min(6, "Mínimo 6 caracteres"),
});

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PublicRegisterType>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: publicRegisterRequest,
    onSuccess: () => {
      toast.success("Registro exitoso 🎉");
      reset();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: PublicRegisterType) => {
    console.log(data);

    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-[url('/coffee-bg.jpg')] bg-cover bg-center flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#f6f1eb] rounded-2xl shadow-xl p-8 w-full max-w-md border border-[#c8b6a6]"
      >
        <h2 className="text-3xl font-bold text-[#5c4033] mb-6 text-center">
          Crear cuenta
        </h2>

        <div className="mb-4">
          <label className="block text-[#5c4033] font-medium mb-1">
            Nombre
          </label>
          <input
            type="text"
            {...register("nombre")}
            className="w-full px-4 py-2 border border-[#d3c0ad] rounded focus:outline-none focus:ring focus:ring-[#a67c52]"
          />
          {errors.nombre && (
            <p className="text-red-600 text-sm mt-1">{errors.nombre.message}</p>
          )}
        </div>

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
          {isSubmitting ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}
