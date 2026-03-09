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
  const [isAdmin, setIsAdmin] = useState(false); // 👈 nuevo estado

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
        tipo_usuario: isAdmin ? "administrador" : "conductor", // 👈 aquí decides
      }),
    });

    if (res.ok) {
      const data = await res.json();
      // Guardamos el nombre en localStorage para simular sesión
      localStorage.setItem("usuario", data.nombre);
      router.push("/inicio"); // redirige a la página principal
    } else {
      const error = await res.json();
      alert(error.error); // muestra cartel si la contraseña < 10 o correo duplicado
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 flex items-center justify-center p-6 text-gray-800">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">
          Crear cuenta
        </h1>

        <form onSubmit={handleRegistro} className="space-y-6">
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label
              htmlFor="correo"
              className="block text-sm font-medium text-gray-700"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="correo"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900"
              placeholder="tucorreo@electrolink.cu"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900"
              placeholder="••••••••••"
            />
          </div>

          <div>
            <label
              htmlFor="provincia"
              className="block text-sm font-medium text-gray-700"
            >
              Provincia
            </label>
            <input
              type="text"
              id="provincia"
              value={provincia}
              onChange={(e) => setProvincia(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900"
              placeholder="Ej: La Habana"
            />
          </div>

          {/* ✅ Checkbox para administrador */}
          <label className="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span>Registrar como administrador</span>
          </label>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Registrarse
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm text-green-600 hover:underline"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </div>
    </main>
  );
}
