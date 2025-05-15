import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f5f1e8]">
      <div className="bg-[#fffaf3] border border-[#e2dcd5] shadow-lg rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-semibold text-[#6b4f3b] mb-4">
          Acceso Denegado
        </h1>
        <p className="text-[#5c4b3a] mb-6">
          Lo sentimos, no tienes los permisos necesarios para ver esta página.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#a9825a] hover:bg-[#8d6a45] text-white font-medium py-2 px-5 rounded-xl transition duration-200 shadow-md"
        >
          Volver al inicio
        </button>
      </div>
    </main>
  );
}

export default Unauthorized;
