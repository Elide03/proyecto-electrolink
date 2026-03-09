"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function InicioPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<string | null>(null);

  useEffect(() => {
    const nombreGuardado = localStorage.getItem("usuario");
    if (nombreGuardado) {
      setUsuario(nombreGuardado);
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 text-gray-800">
      {/* Encabezado */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">ElectroLink</h1>
          <p className="text-sm text-gray-600">
            Conectando negocios, cargadores y cultura de electromovilidad en
            Cuba.
          </p>
        </div>

        {/* Usuario activo */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold text-xl">
            {usuario ? usuario.charAt(0).toUpperCase() : "?"}
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-800">{usuario}</p>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:underline"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Secciones */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 max-w-5xl mx-auto mt-8">
        <Link
          href="/negocios"
          className="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Negocios</h2>
          <p className="text-sm text-gray-600">
            Explora empresas que impulsan la electromovilidad en Cuba.
          </p>
          <div className="mt-4 text-right">
            <span className="text-blue-600 font-medium hover:underline">
              Explorar →
            </span>
          </div>
        </Link>

        <Link
          href="/cargadores"
          className="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            Cargadores
          </h2>
          <p className="text-sm text-gray-600">
            Encuentra puntos de carga disponibles para tu vehículo eléctrico.
          </p>
          <div className="mt-4 text-right">
            <span className="text-green-600 font-medium hover:underline">
              Ver mapa →
            </span>
          </div>
        </Link>

        <Link
          href="/publicaciones"
          className="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            Publicaciones
          </h2>
          <p className="text-sm text-gray-600">
            Mantente informado con noticias y artículos sobre sostenibilidad.
          </p>
          <div className="mt-4 text-right">
            <span className="text-blue-600 font-medium hover:underline">
              Leer más →
            </span>
          </div>
        </Link>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-sm text-gray-500 text-center pb-6">
        © 2025 ElectroLink — Construyendo confianza en la electromovilidad.
      </footer>
    </main>
  );
}
