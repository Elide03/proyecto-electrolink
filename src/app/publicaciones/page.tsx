"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function AdminPublicacionesPage() {
  const [publicaciones, setPublicaciones] = useState<any[]>([]);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitulo, setEditTitulo] = useState("");
  const [editContenido, setEditContenido] = useState("");

  // ⚡ Rol y usuario desde sesión/localStorage
  const tipoUsuario =
    typeof window !== "undefined"
      ? localStorage.getItem("tipo_usuario")?.toLowerCase()
      : null;

  const usuarioId =
    typeof window !== "undefined"
      ? Number(localStorage.getItem("usuario_id"))
      : null;

  const isAdmin = tipoUsuario === "administrador";

  // Cargar publicaciones
  useEffect(() => {
    fetch("/api/publicaciones")
      .then((res) => res.json())
      .then((data) =>
        setPublicaciones(
          data.map((p: any) => ({
            ...p,
            id: Number(p.id),
            autorId: Number(p.autorId),
          }))
        )
      );
  }, []);

  // Crear publicación
  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/publicaciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, contenido, autorId: usuarioId }),
    });
    if (res.ok) {
      const nueva = await res.json();
      setPublicaciones([...publicaciones, { ...nueva, id: Number(nueva.id) }]);
      setTitulo("");
      setContenido("");
      setShowForm(false);
    }
  };

  // Eliminar publicación
  const handleEliminar = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar esta publicación?")) return;
    const res = await fetch("/api/publicaciones", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setPublicaciones(publicaciones.filter((p) => p.id !== id));
    }
  };

  // Guardar edición
  const handleGuardarEdicion = async (id: number) => {
    const res = await fetch("/api/publicaciones", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        titulo: editTitulo,
        contenido: editContenido,
      }),
    });
    if (res.ok) {
      const actualizada = await res.json();
      setPublicaciones(
        publicaciones.map((p) =>
          p.id === id ? { ...actualizada, id: Number(actualizada.id) } : p
        )
      );
      setEditId(null);
      setEditTitulo("");
      setEditContenido("");
    }
  };

  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h1 className="text-xl font-bold text-blue-800">ElectroLink - Admin</h1>
        <nav className="space-x-4">
          <Link href="/inicio" className="text-blue-600 hover:underline">
            Inicio
          </Link>
          <Link href="/perfil" className="text-green-600 hover:underline">
            Mi perfil
          </Link>
        </nav>
      </header>

      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 p-6 space-y-8">
        <h1 className="text-2xl font-bold text-blue-800">
          Administrar Publicaciones
        </h1>

        {/* Botón crear */}
        {isAdmin && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            ➕ Nueva publicación
          </button>
        )}

        {/* Formulario crear */}
        {showForm && (
          <form
            onSubmit={handleCrear}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200 space-y-4 mt-4"
          >
            <input
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full border rounded-md p-2"
              required
            />
            <textarea
              placeholder="Contenido"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              className="w-full border rounded-md p-2"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Guardar
            </button>
          </form>
        )}

        {/* Lista publicaciones */}
        {publicaciones.length === 0 ? (
          <p className="text-gray-600">No hay publicaciones registradas.</p>
        ) : (
          <div className="space-y-6">
            {publicaciones.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
              >
                {editId === p.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editTitulo}
                      onChange={(e) => setEditTitulo(e.target.value)}
                      className="w-full border rounded-md p-2"
                      placeholder="Título de la publicación"
                    />

                    <textarea
                      value={editContenido}
                      onChange={(e) => setEditContenido(e.target.value)}
                      className="w-full border rounded-md p-2"
                      placeholder="Contenido de la publicación"
                    />

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleGuardarEdicion(p.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
                      >
                        💾 Guardar
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500 text-sm"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-lg font-semibold text-green-700">
                      {p.titulo}
                    </h2>
                    <p className="mt-2 text-gray-700 whitespace-pre-line">
                      {p.contenido}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      Autor: {p.autor?.nombre ?? "Desconocido"}
                    </p>
                    <p className="text-xs text-gray-400">
                      Publicado el{" "}
                      {new Date(p.fecha_creacion).toLocaleDateString()}
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                      {p.reacciones?.length ?? 0} reacción(es)
                    </p>

                    {/* Botones CRUD solo admin */}
                    {isAdmin && (
                      <div className="flex space-x-4 mt-3">
                        <button
                          onClick={() => {
                            setEditId(p.id);
                            setEditTitulo(p.titulo);
                            setEditContenido(p.contenido);
                          }}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          ✏️ Editar
                        </button>
                        <button
                          onClick={() => handleEliminar(p.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          🗑️ Eliminar
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
