"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/src/app/utils/session";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) {
      router.push("/"); // redirige si hay sesión
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 flex flex-col items-center justify-center px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold text-blue-800 mb-4 text-center">
        Bienvenido a ElectroLink
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
        Conectando negocios, cargadores y cultura de electromovilidad en Cuba.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition text-center"
        >
          Iniciar sesión
        </a>
        <a
          href="/registro"
          className="px-6 py-3 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition text-center"
        >
          Registrarse
        </a>
      </div>

      <footer className="mt-12 text-sm text-gray-500 text-center">
        © 2025 ElectroLink — Construyendo confianza en la electromovilidad.
      </footer>
    </main>
  );
}
