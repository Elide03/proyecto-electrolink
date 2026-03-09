import { prisma } from "@/lib/prisma";

export default async function TestPage() {
  const usuarios = await prisma.usuario.findMany();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Usuarios en la base</h1>
      <ul className="mt-4 space-y-2">
        {usuarios.map((u) => (
          <li key={u.id} className="border p-2 rounded">
            {u.nombre} — {u.provincia ?? "Sin provincia"}
          </li>
        ))}
      </ul>
    </div>
  );
}
