import { Toaster } from "sonner";
import ReservarionsUser from "../components/ReservarionsUser";
import ReservationsForm from "../components/ReservationsForm";

function UserReservas() {
  return (
    <main>
           <Toaster position="top-right" theme="dark" closeButton duration={2000}/>
      <ReservationsForm />
       <ReservarionsUser />
    </main>
  );
}

export default UserReservas;
