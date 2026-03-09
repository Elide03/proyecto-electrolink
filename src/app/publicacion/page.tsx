import { prisma } from "@/lib/prisma";
import type { Publicacion } from "@/interfaces/publicacion";

export default async function PublicacionesPage() {
  const publicacionesFromDb = await prisma.publicacion.findMany({
    include: {
      autor: true, // respeta tu modelo: relación con Usuario
      reacciones: {
        include: { usuario: true }, // para mostrar el usuario que reaccionó
      },
    },
  });

  const publicaciones: Publicacion[] = publicacionesFromDb.map((p) => ({
    id: p.id,
    titulo: p.titulo,
    contenido: p.contenido,
    autorId: p.autorId,
    autorNombre: p.autor?.nombre,
    reacciones: p.reacciones.map((r) => ({
      id: r.id,
      tipo: r.tipo,
      usuarioId: r.usuarioId,
      publicacionId: r.publicacionId,
      usuarioNombre: r.usuario?.nombre,
    })),
  }));

  return (
    <div>
      <h1>Publicaciones</h1>
      <ul>
        {publicaciones.map((p) => (
          <li key={p.id.toString()}>
            <h2>{p.titulo}</h2>
            <p>{p.contenido}</p>
            <p>
              <strong>Autor:</strong> {p.autorNombre}
            </p>
            <h3>Reacciones:</h3>
            <ul>
              {p.reacciones.map((r) => (
                <li key={r.id.toString()}>
                  {r.tipo} — <em>{r.usuarioNombre}</em>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
