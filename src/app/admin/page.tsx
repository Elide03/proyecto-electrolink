"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Publicacion {
  id: number;
  titulo: string;
  contenido: string;
  fecha_creacion: string;
  autor?: { nombre: string };
  autorId?: number;
}

export default function AdminInicioPage() {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Crear
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Editar
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitulo, setEditTitulo] = useState("");
  const [editContenido, setEditContenido] = useState("");

  const [isAdmin, setIsAdmin] = useState(true);

  // Rol y usuario desde sesión/localStorage
  const tipoUsuario =
    typeof window !== "undefined"
      ? localStorage.getItem("tipo_usuario")?.toLowerCase()
      : null;
  const usuarioId =
    typeof window !== "undefined"
      ? Number(localStorage.getItem("usuario_id"))
      : null;

  // Cargar publicaciones
  useEffect(() => {
    const fetchPublicaciones = async () => {
      const res = await fetch("/api/publicaciones");
      if (res.ok) {
        const data = await res.json();
        setPublicaciones(
          data.map((p: any) => ({
            ...p,
            id: Number(p.id),
            autorId: Number(p.autorId),
          }))
        );
      }
    };
    fetchPublicaciones();
  }, []);

  // Crear publicación
  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuarioId) {
      alert("No se encontró el usuario en sesión.");
      return;
    }
    const res = await fetch("/api/publicaciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, contenido, autorId: usuarioId }),
    });
    if (res.ok) {
      const nueva = await res.json();
      setPublicaciones((prev) => [
        ...prev,
        { ...nueva, id: Number(nueva.id), autorId: Number(nueva.autorId) },
      ]);
      setTitulo("");
      setContenido("");
      setShowForm(false);
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err?.error ?? "Error al crear publicación");
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
      setPublicaciones((prev) => prev.filter((p) => p.id !== id));
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err?.error ?? "Error al eliminar publicación");
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
      setPublicaciones((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...actualizada,
                id: Number(actualizada.id),
                autorId: Number(actualizada.autorId),
              }
            : p
        )
      );
      setEditId(null);
      setEditTitulo("");
      setEditContenido("");
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err?.error ?? "Error al editar publicación");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 text-gray-800">
      {/* Header con menú desplegable */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-800">ElectroLink Admin</h1>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Gestionar
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
              <Link
                href="#publicaciones"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
              >
                Publicaciones
              </Link>
              {/* Aquí puedes añadir más opciones de gestión */}
            </div>
          )}
        </div>
      </header>

      {/* Contenido */}
      <section id="publicaciones" className="p-6 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Listado de Publicaciones
        </h2>

        {/* Botón crear */}
        {isAdmin && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mb-4"
          >
            ➕ Nueva publicación
          </button>
        )}

        {/* Formulario crear */}
        {showForm && isAdmin && (
          <form
            onSubmit={handleCrear}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200 space-y-4 mb-6"
          >
            <label className="block">
              <span className="text-sm text-gray-700">Título</span>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full border rounded-md p-2"
                placeholder="Título de la publicación"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm text-gray-700">Contenido</span>
              <textarea
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                className="w-full border rounded-md p-2"
                placeholder="Contenido de la publicación"
                required
              />
            </label>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Guardar
            </button>
          </form>
        )}

        {publicaciones.length === 0 ? (
          <p className="text-gray-600">No hay publicaciones registradas.</p>
        ) : (
          <div className="space-y-4">
            {publicaciones.map((pub) => (
              <div
                key={pub.id}
                className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition"
              >
                {editId === pub.id ? (
                  <div className="space-y-2">
                    <label className="block">
                      <span className="text-sm text-gray-700">Título</span>
                      <input
                        type="text"
                        value={editTitulo}
                        onChange={(e) => setEditTitulo(e.target.value)}
                        className="w-full border rounded-md p-2"
                        placeholder="Título"
                        required
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm text-gray-700">Contenido</span>
                      <textarea
                        value={editContenido}
                        onChange={(e) => setEditContenido(e.target.value)}
                        className="w-full border rounded-md p-2"
                        placeholder="Contenido"
                        required
                      />
                    </label>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleGuardarEdicion(pub.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
                      >
                        💾 Guardar
                      </button>
                      <button
                        onClick={() => {
                          setEditId(null);
                          setEditTitulo("");
                          setEditContenido("");
                        }}
                        className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500 text-sm"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-bold text-green-700">
                      {pub.titulo}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {new Date(pub.fecha_creacion).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">{pub.contenido}</p>

                    <div className="mt-2 flex justify-between items-center">
                      <Link
                        href={`/publicaciones/${pub.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Ver detalle →
                      </Link>

                      {isAdmin && (
                        <div className="flex space-x-4">
                          <button
                            onClick={() => {
                              setEditId(pub.id);
                              setEditTitulo(pub.titulo);
                              setEditContenido(pub.contenido);
                            }}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            ✏️ Editar
                          </button>
                          <button
                            onClick={() => handleEliminar(pub.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            🗑️ Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
