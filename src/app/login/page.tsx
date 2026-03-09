"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo: email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      // Guardamos el nombre y rol en localStorage para simular sesión
      localStorage.setItem("usuario", data.nombre);
      localStorage.setItem("rol", data.tipo_usuario);

      // Redirigir según el rol
      if (data.tipo_usuario === "administrador") {
        router.push("/admin");
      } else {
        router.push("/inicio");
      }
    } else {
      const error = await res.json();
      alert(error.error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 flex items-center justify-center p-6 text-gray-800">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          Iniciar sesión
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/registro"
            className="text-sm text-green-600 hover:underline"
          >
            ¿No tienes cuenta? Regístrate
          </Link>
          <br />
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
