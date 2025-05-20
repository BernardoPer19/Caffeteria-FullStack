import { Toaster } from "sonner";
import { AdminReservasTable } from "../components/admin/ReservationsManagment";

function AdminReservas() {
  return (
    <div>
      <Toaster position="top-right" theme="dark" closeButton duration={2000}/>
      <AdminReservasTable />
    </div>
  );
}

export default AdminReservas;
