import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthForm } from "../hooks/useAuth";

const schema = z.object({
  nombre: z.string().min(2, "Por favor ingresa un nombre válido"),
  email: z.string().email("Email inválido"),
  contraseña: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  rol: z.enum(["usuario", "empleado"]),
});

type FormType = z.infer<typeof schema>;

function RegisterEmpleadoForm() {
  const {
    registerAdmin: { registerAdminMutate, isRegisterAdminPending },
  } = useAuthForm();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      rol: "empleado",
    },
  });

  const onSubmit = (data: FormType) => {
    registerAdminMutate(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-6 bg-[#f5efe6] p-6 rounded-xl shadow-lg items-center justify-center max-w-full overflow-x-auto"
    >
      <div className="flex flex-col">
        <label className="mb-1 text-[#6b4c3b] font-semibold">Nombre</label>
        <input
          {...register("nombre")}
          placeholder="Ej: Juan Pérez"
          className={`border rounded-md px-4 py-2 w-48 transition-shadow 
            focus:outline-none focus:ring-2 focus:ring-[#a9745b] 
            ${errors.nombre ? "border-red-500" : "border-[#c2b6a1]"}`}
        />
        {errors.nombre && (
          <span className="text-red-600 text-xs mt-1">
            {errors.nombre.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-[#6b4c3b] font-semibold">Email</label>
        <input
          {...register("email")}
          placeholder="ejemplo@correo.com"
          type="email"
          className={`border rounded-md px-4 py-2 w-56 transition-shadow 
            focus:outline-none focus:ring-2 focus:ring-[#a9745b] 
            ${errors.email ? "border-red-500" : "border-[#c2b6a1]"}`}
        />
        {errors.email && (
          <span className="text-red-600 text-xs mt-1">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-[#6b4c3b] font-semibold">Contraseña</label>
        <input
          {...register("contraseña")}
          placeholder="******"
          type="password"
          className={`border rounded-md px-4 py-2 w-48 transition-shadow 
            focus:outline-none focus:ring-2 focus:ring-[#a9745b] 
            ${errors.contraseña ? "border-red-500" : "border-[#c2b6a1]"}`}
        />
        {errors.contraseña && (
          <span className="text-red-600 text-xs mt-1">
            {errors.contraseña.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-[#6b4c3b] font-semibold">Rol</label>
        <select
          {...register("rol")}
          className={`border rounded-md px-4 py-2 w-40 transition-shadow
            focus:outline-none focus:ring-2 focus:ring-[#a9745b]
            ${errors.rol ? "border-red-500" : "border-[#c2b6a1]"}`}
        >
          <option value="empleado">Empleado</option>
          <option value="usuario">Usuario</option>
        </select>
        {errors.rol && (
          <span className="text-red-600 text-xs mt-1">
            {errors.rol.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isRegisterAdminPending}
        className={`bg-[#6b4c3b] text-white font-semibold px-6 py-3 rounded-lg 
          hover:bg-[#5a3e31] transition-colors disabled:opacity-50`}
      >
        {isRegisterAdminPending ? "Registrando..." : "Registrar"}
      </button>
    </form>
  );
}

export default RegisterEmpleadoForm;
