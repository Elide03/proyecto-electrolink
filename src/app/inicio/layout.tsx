// src/app/inicio/layout.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InicioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
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
    <main className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#1b2a49] to-[#2e1a47] text-gray-200 font-[Poppins] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#121826]/80 backdrop-blur-md border-r border-gray-700 flex flex-col p-6">
        <h1 className="text-2xl font-extrabold mb-8">
          <span className="text-green-400">Electro</span>
          <span className="text-blue-400">Link</span>
        </h1>

        <nav className="flex flex-col gap-4">
          <Link
            href="/inicio/negocios"
            className={`px-3 py-2 rounded-md transition ${
              pathname === "/inicio/negocios"
                ? "bg-green-600 text-white font-semibold"
                : "text-gray-300 hover:bg-green-500/20 hover:text-green-400"
            }`}
          >
            Negocios
          </Link>
          <Link
            href="/inicio/cargadores"
            className={`px-3 py-2 rounded-md transition ${
              pathname === "/inicio/cargadores"
                ? "bg-green-600 text-white font-semibold"
                : "text-gray-300 hover:bg-green-500/20 hover:text-green-400"
            }`}
          >
            Cargadores
          </Link>
          <Link
            href="/inicio/publicaciones"
            className={`px-3 py-2 rounded-md transition ${
              pathname === "/inicio/publicaciones"
                ? "bg-green-600 text-white font-semibold"
                : "text-gray-300 hover:bg-green-500/20 hover:text-green-400"
            }`}
          >
            Publicaciones
          </Link>
        </nav>

        {/* Usuario activo */}
        <div className="mt-auto flex items-center gap-3 border-t border-gray-700 pt-4">
          <div className="w-10 h-10 rounded-full bg-green-500 text-black font-bold flex items-center justify-center">
            {usuario ? usuario.charAt(0).toUpperCase() : "?"}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-200">{usuario}</p>
            <button
              onClick={handleLogout}
              className="text-xs text-red-400 hover:text-red-500 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </aside>

      {/* Contenido dinámico */}
      <section className="flex-1 p-10">{children}</section>
    </main>
  );
}
