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
      localStorage.setItem("usuario", data.nombre);
      localStorage.setItem("rol", data.tipo_usuario);

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
    <main className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#1b2a49] to-[#2e1a47] flex items-center justify-center p-6 text-gray-200 font-[Poppins]">
      <div className="bg-[#121826]/80 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-extrabold text-center mb-8">
          <span className="text-green-400">Iniciar</span>{" "}
          <span className="text-blue-400">sesión</span>
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold rounded-md hover:scale-105 hover:shadow-lg hover:shadow-green-500/40 transition"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <Link
            href="/registro"
            className="text-sm text-green-400 hover:text-blue-400 transition"
          >
            ¿No tienes cuenta? Regístrate
          </Link>
          <br />
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-purple-400 transition"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
