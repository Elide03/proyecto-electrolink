"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegistroPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [provincia, setProvincia] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleRegistro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        correo,
        password,
        provincia,
        tipo_usuario: isAdmin ? "administrador" : "conductor",
      }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("usuario", data.nombre);
      router.push("/inicio");
    } else {
      const error = await res.json();
      alert(error.error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#1b2a49] to-[#2e1a47] flex items-center justify-center p-6 text-gray-200 font-[Poppins]">
      <div className="bg-[#121826]/80 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-extrabold text-center mb-8">
          <span className="text-green-400">Crear</span>{" "}
          <span className="text-blue-400">cuenta</span>
        </h1>

        <form onSubmit={handleRegistro} className="space-y-6">
          <div>
            <label htmlFor="nombre" className="block text-sm text-gray-300">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-1 w-full rounded-md bg-[#1b2a49] border border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-green-400 focus:border-green-400"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label htmlFor="correo" className="block text-sm text-gray-300">
              Correo electrónico
            </label>
            <input
              type="email"
              id="correo"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="mt-1 w-full rounded-md bg-[#1b2a49] border border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-green-400 focus:border-green-400"
              placeholder="tucorreo@electrolink.cu"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-300">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md bg-[#1b2a49] border border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-green-400 focus:border-green-400"
              placeholder="••••••••••"
            />
          </div>

          <div>
            <label htmlFor="provincia" className="block text-sm text-gray-300">
              Provincia
            </label>
            <input
              type="text"
              id="provincia"
              value={provincia}
              onChange={(e) => setProvincia(e.target.value)}
              className="mt-1 w-full rounded-md bg-[#1b2a49] border border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-green-400 focus:border-green-400"
              placeholder="Ej: La Habana"
            />
          </div>

          <label className="flex items-center space-x-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="h-4 w-4 text-blue-500 border-gray-500 rounded focus:ring-blue-400"
            />
            <span>Registrar como administrador</span>
          </label>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold rounded-md hover:scale-105 hover:shadow-lg hover:shadow-green-500/40 transition"
          >
            Registrarse
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm text-green-400 hover:text-blue-400 transition"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </div>
    </main>
  );
}
