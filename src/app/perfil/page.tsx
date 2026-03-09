// src/app/perfil/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PerfilPage() {
  const router = useRouter();
  const [usuario] = useState({
    nombre: "Administrador",
    correo: "admin@electrolink.cu",
    rol: "Super Admin",
  });

  const handleLogout = () => {
    // Simulación de logout para MVP
    alert("Sesión cerrada");
    router.push("/login");
  };

  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h1 className="text-xl font-bold text-blue-800">ElectroLink</h1>
        <nav className="space-x-4">
          <Link href="/" className="text-blue-600 hover:underline">
            Inicio
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline"
          >
            Cerrar sesión
          </button>
        </nav>
      </header>

      {/* Fondo y contenido */}
      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 flex items-center justify-center p-6 text-gray-800">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md border border-gray-200">
          <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">
            Perfil del usuario
          </h1>

          <div className="space-y-4">
            <p>
              <span className="font-semibold text-gray-700">Nombre:</span>{" "}
              {usuario.nombre}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Correo:</span>{" "}
              {usuario.correo}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Rol:</span>{" "}
              {usuario.rol}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>

          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-blue-600 hover:underline">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </main>

      {/* Footer opcional si quieres consistencia total */}
      {/* <Footer /> */}
    </>
  );
}
