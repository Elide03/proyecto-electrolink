import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function NegocioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  console.log("📌 params recibido:", resolvedParams);

  try {
    const negocio = await prisma.negocio.findUnique({
      where: { id: BigInt(resolvedParams.id) },
      include: { cargadores: true },
    });

    if (!negocio) {
      return <div className="p-6 text-gray-400">Negocio no encontrado.</div>;
    }

    return (
      <main className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#1b2a49] to-[#2e1a47] flex items-center justify-center p-8 text-gray-200 font-[Poppins]">
        <div className="bg-[#121826]/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-700 p-8 max-w-lg w-full transition transform hover:-translate-y-1 hover:scale-[1.02]">
          {/* Nombre del negocio */}
          <h1 className="text-3xl font-bold text-green-400 mb-2">
            {negocio.nombre_empresa}
          </h1>

          {/* Dirección */}
          <p className="text-sm text-gray-400 mb-1">{negocio.direccion}</p>

          {/* Teléfono */}
          <p className="text-gray-300">📞 {negocio.telefono}</p>

          {/* Correo de contacto */}
          <p className="text-gray-300">✉️ {negocio.correo_contacto}</p>

          {/* Horario general */}
          <p className="text-gray-300">🕒 {negocio.horario_general}</p>

          {/* Resumen opcional: cantidad de cargadores */}
          {negocio.cargadores.length > 0 && (
            <p className="mt-3 text-sm text-gray-400 italic">
              {negocio.cargadores.length} cargador(es) disponibles
            </p>
          )}

          {/* Botón volver */}
          <div className="mt-6 text-right">
            <Link
              href="/inicio/negocios"
              className="text-blue-400 hover:text-green-400 underline transition"
            >
              ← Volver a negocios
            </Link>
          </div>
        </div>
      </main>
    );
  } catch (error: any) {
    console.error("❌ Error en detalle de negocio:", error);
    return (
      <div className="p-6 text-red-500">
        Ocurrió un error al cargar el negocio.
        <br />
        <span className="text-sm text-gray-500">
          {error.message ?? "Error desconocido"}
        </span>
      </div>
    );
  }
}
