import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Footer from "@/components/Footer";

export default async function NegociosPage() {
  const negocios = await prisma.negocio.findMany({
    include: {
      cargadores: true,
    },
  });

  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h1 className="text-xl font-bold text-blue-800">ElectroLink</h1>
        <nav className="space-x-4">
          <Link href="/login" className="text-blue-600 hover:underline">
            Iniciar sesión
          </Link>
          <Link href="/perfil" className="text-green-600 hover:underline">
            Mi perfil
          </Link>
        </nav>
      </header>

      {/* Fondo y contenido */}
      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 p-6 space-y-8">
        <h1 className="text-2xl font-bold text-blue-800">Negocios</h1>

        {/* Botón volver al inicio */}
        <Link
          href="/inicio"
          className="inline-block text-blue-600 hover:text-blue-800 underline mb-4"
        >
          ← Volver
        </Link>

        {negocios.length === 0 ? (
          <p className="text-gray-600">No hay negocios registrados.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {negocios.map((n) => (
              <Link
                key={n.id.toString()}
                href={`/negocios/${n.id.toString()}`}
                className="bg-white rounded-lg shadow-md p-4 border border-gray-200 transition transform hover:shadow-lg hover:-translate-y-1 hover:scale-105"
              >
                <h2 className="text-lg font-semibold text-green-700">
                  {n.nombre_empresa}
                </h2>
                <p className="mt-1 text-gray-700">{n.direccion}</p>
                <p className="mt-1 text-gray-700">Tel: {n.telefono}</p>
                <p className="mt-1 text-gray-700">
                  Correo: {n.correo_contacto}
                </p>
                <p className="mt-1 text-gray-700">
                  Horario: {n.horario_general}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  {n.cargadores.length} cargador(es)
                </p>
                <div className="mt-3 text-right">
                  <span className="text-blue-600 font-medium hover:underline">
                    Ver más →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
