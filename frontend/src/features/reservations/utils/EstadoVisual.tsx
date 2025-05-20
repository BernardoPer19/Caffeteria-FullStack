import type { Estado } from "../types/ReservationsTypes";

export const EstadoVisual = ({ estado }: { estado: Estado }) => {
  let color = "";
  let icon = "";

  switch (estado) {
    case "pendiente":
      color = "text-yellow-500";
      icon = "⏳"; // reloj de arena
      break;
    case "aceptada":
      color = "text-green-600";
      icon = "✅"; // check
      break;
    case "rechazada":
      color = "text-red-600";
      icon = "❌"; // cruz
      break;
    default:
      color = "text-gray-500";
      icon = "❓";
  }

  return (
    <span className={`flex items-center space-x-1 font-semibold ${color}`}>
      <span>{icon}</span>
      <span className="capitalize">{estado}</span>
    </span>
  );
};
