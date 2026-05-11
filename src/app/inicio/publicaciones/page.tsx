"use client";

import { useState, useEffect } from "react";

export default function AdminPublicacionesPage() {
  const [publicaciones, setPublicaciones] = useState<any[]>([]);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitulo, setEditTitulo] = useState("");
  const [editContenido, setEditContenido] = useState("");

  const tipoUsuario =
    typeof window !== "undefined"
      ? localStorage.getItem("tipo_usuario")?.toLowerCase()
      : null;

  const usuarioId =
    typeof window !== "undefined"
      ? Number(localStorage.getItem("usuario_id"))
      : null;

  const isAdmin = tipoUsuario === "administrador";

  useEffect(() => {
    fetch("/api/publicaciones")
      .then((res) => res.json())
      .then((data) =>
        setPublicaciones(
          data.map((p: any) => ({
            ...p,
            id: Number(p.id),
            autorId: Number(p.autorId),
          })),
        ),
      );
  }, []);

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
          p.id === id ? { ...actualizada, id: Number(actualizada.id) } : p,
        ),
      );
      setEditId(null);
      setEditTitulo("");
      setEditContenido("");
    }
  };

  return (
    <main className="space-y-8">
      <h1 className="text-3xl font-bold text-green-400">
        Administrar Publicaciones
      </h1>

      {/* Botón crear */}
      {isAdmin && (
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-2 rounded-md hover:scale-105 transition"
        >
          ➕ Nueva publicación
        </button>
      )}

      {/* Formulario crear */}
      {showForm && (
        <form
          onSubmit={handleCrear}
          className="bg-[#121826]/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700 space-y-4 mt-4"
        >
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full rounded-md bg-[#1b2a49] border border-gray-600 text-gray-100 placeholder-gray-400 p-2 focus:ring-green-400 focus:border-green-400"
            required
          />
          <textarea
            placeholder="Contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            className="w-full rounded-md bg-[#1b2a49] border border-gray-600 text-gray-100 placeholder-gray-400 p-2 focus:ring-green-400 focus:border-green-400"
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-2 rounded-md hover:scale-105 transition"
          >
            Guardar
          </button>
        </form>
      )}

      {/* Lista publicaciones */}
      {publicaciones.length === 0 ? (
        <p className="text-gray-400">No hay publicaciones registradas.</p>
      ) : (
        <div className="space-y-6">
          {publicaciones.map((p) => (
            <div
              key={p.id}
              className="bg-[#121826]/80 backdrop-blur-md rounded-xl shadow-md p-6 border border-gray-700"
            >
              {editId === p.id ? (
                <div className="space-y-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="editTitulo"
                      className="block text-sm text-gray-300"
                    >
                      Título de la publicación
                    </label>
                    <input
                      id="editTitulo"
                      type="text"
                      value={editTitulo}
                      onChange={(e) => setEditTitulo(e.target.value)}
                      className="w-full rounded-md bg-[#1b2a49] border border-gray-600 text-gray-100 p-2"
                      placeholder="Título de la publicación"
                    />

                    <label
                      htmlFor="editContenido"
                      className="block text-sm text-gray-300"
                    >
                      Contenido
                    </label>
                    <textarea
                      id="editContenido"
                      value={editContenido}
                      onChange={(e) => setEditContenido(e.target.value)}
                      className="w-full rounded-md bg-[#1b2a49] border border-gray-600 text-gray-100 p-2"
                      placeholder="Escribe el contenido aquí..."
                    />
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleGuardarEdicion(p.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
                    >
                      💾 Guardar
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 text-sm"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-semibold text-blue-400">
                    {p.titulo}
                  </h2>
                  <p className="mt-2 text-gray-300 whitespace-pre-line">
                    {p.contenido}
                  </p>
                  <p className="mt-2 text-sm text-gray-400">
                    Autor: {p.autor?.nombre ?? "Desconocido"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Publicado el{" "}
                    {new Date(p.fecha_creacion).toLocaleDateString()}
                  </p>
                  <p className="mt-2 text-sm text-gray-400">
                    {p.reacciones?.length ?? 0} reacción(es)
                  </p>

                  {isAdmin && (
                    <div className="flex space-x-4 mt-3">
                      <button
                        onClick={() => {
                          setEditId(p.id);
                          setEditTitulo(p.titulo);
                          setEditContenido(p.contenido);
                        }}
                        className="text-green-400 hover:text-blue-400 text-sm"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => handleEliminar(p.id)}
                        className="text-red-400 hover:text-red-600 text-sm"
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
  );
}
