import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function NegociosPage() {
  const negocios = await prisma.negocio.findMany({
    include: {
      cargadores: true,
    },
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#1b2a49] to-[#2e1a47] p-8 text-gray-200 font-[Poppins]">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-green-400">Negocios</h1>

        {negocios.length === 0 ? (
          <p className="text-gray-400">No hay negocios registrados.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {negocios.map((n) => (
              <Link
                key={n.id.toString()}
                href={`/negocios/${n.id.toString()}`}
                className="bg-[#121826]/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-700 hover:border-green-500 transition transform hover:-translate-y-1 hover:scale-105"
              >
                <h2 className="text-lg font-semibold text-green-400">
                  {n.nombre_empresa}
                </h2>
                <p className="mt-1 text-gray-300">{n.direccion}</p>
                <p className="mt-1 text-gray-300">Tel: {n.telefono}</p>
                <p className="mt-1 text-gray-300">
                  Correo: {n.correo_contacto}
                </p>
                <p className="mt-1 text-gray-300">
                  Horario: {n.horario_general}
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  {n.cargadores.length} cargador(es)
                </p>
                <div className="mt-3 text-right">
                  <span className="text-blue-400 font-medium hover:underline">
                    Ver más →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
