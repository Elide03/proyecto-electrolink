import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function NegocioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Resolvemos los params como pediste
  const resolvedParams = await params;
  console.log("📌 params recibido:", resolvedParams);
  console.log("➡️ params.id:", resolvedParams.id);

  try {
    // Conversión correcta: tu modelo usa BigInt
    const negocio = await prisma.negocio.findUnique({
      where: { id: BigInt(resolvedParams.id) },
      include: { cargadores: true },
    });

    if (!negocio) {
      return <div className="p-6">Negocio no encontrado.</div>;
    }

    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-lg w-full">
          {/* Nombre del negocio */}
          <h1 className="text-3xl font-bold text-blue-800 mb-2">
            {negocio.nombre_empresa}
          </h1>

          {/* Dirección */}
          <p className="text-sm text-gray-600 mb-1">{negocio.direccion}</p>

          {/* Teléfono */}
          <p className="text-gray-700">📞 {negocio.telefono}</p>

          {/* Correo de contacto */}
          <p className="text-gray-700">✉️ {negocio.correo_contacto}</p>

          {/* Horario general */}
          <p className="text-gray-700">🕒 {negocio.horario_general}</p>

          {/* Resumen opcional: cantidad de cargadores */}
          {negocio.cargadores.length > 0 && (
            <p className="mt-3 text-sm text-gray-600 italic">
              {negocio.cargadores.length} cargador(es) disponibles
            </p>
          )}

          {/* Botón volver */}
          <div className="mt-6">
            <Link
              href="/negocios"
              className="inline-block text-blue-600 hover:text-blue-800 underline"
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
      <div className="p-6 text-red-600">
        Ocurrió un error al cargar el negocio.
        <br />
        <span className="text-sm text-gray-500">
          {error.message ?? "Error desconocido"}
        </span>
      </div>
    );
  }
}
