import { prisma } from "@/lib/prisma";
import type { Usuario } from "@/interfaces/usuario";

export default async function UsuariosPage() {
  const usuariosFromDb = await prisma.usuario.findMany();

  const usuarios: Usuario[] = usuariosFromDb.map((u) => ({
    id: u.id,
    nombre: u.nombre,
    correo: u.correo,
    provincia: u.provincia,
    tipo_usuario: u.tipo_usuario,
  }));

  return (
    <div>
      <h1>Usuarios del sistema</h1>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id.toString()}>
            {u.nombre} — {u.correo} — {u.provincia} — Rol: {u.tipo_usuario}
          </li>
        ))}
      </ul>
    </div>
  );
}
