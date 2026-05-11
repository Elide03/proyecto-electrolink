"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/src/app/utils/session";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) {
      router.push("/");
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#1b2a49] to-[#2e1a47] text-gray-200 flex flex-col justify-between">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6">
        <h2 className="text-2xl font-bold">
          <span className="text-green-400">Electro</span>
          <span className="text-blue-400">Link</span>
        </h2>
        <nav className="flex gap-6 text-sm text-gray-300">
          <a href="#about" className="hover:text-green-400 transition">
            Sobre
          </a>
          <a href="#features" className="hover:text-blue-400 transition">
            Características
          </a>
          <a href="#contact" className="hover:text-purple-400 transition">
            Contacto
          </a>
        </nav>
      </header>

      {/* Hero principal */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-16">
        <h1 className="text-5xl font-extrabold mb-4">
          Bienvenido a <span className="text-green-400">Electro</span>
          <span className="text-blue-400">Link</span>
        </h1>
        <p className="text-lg text-gray-300 mb-10 max-w-2xl">
          Conectando negocios, cargadores y cultura de electromovilidad en Cuba.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <a
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-blue-500/50 transition transform hover:scale-105 text-center"
          >
            Iniciar sesión
          </a>
          <a
            href="/registro"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 hover:shadow-green-500/50 transition transform hover:scale-105 text-center"
          >
            Registrarse
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 py-6 border-t border-gray-700">
        © 2025 ElectroLink — Construyendo confianza en la electromovilidad.
      </footer>
    </main>
  );
}
