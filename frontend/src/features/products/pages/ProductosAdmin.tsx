// pages/admin/productos.tsx o similar

import { Toaster } from "sonner";
import { ProductForm } from "../components/ProductsForm";
import { ProductPanel } from "../components/ProductsPanel";

export default function ProductosAdmin() {
  return (
    <div className="space-y-10 py-10">
      <Toaster position="top-right" theme="dark" closeButton duration={2000} />
      <ProductForm />
      <ProductPanel />
    </div>
  );
}
