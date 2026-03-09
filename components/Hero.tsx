import Link from "next/link";

export default function Hero() {
  return (
    <div className="text-center py-12 bg-blue-50 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-blue-800">ElectroLink</h1>
      <p className="mt-4 text-lg text-gray-700">
        Plataforma para conectar negocios, cargadores y cultura de la
        electromovilidad en Cuba.
      </p>
      <div className="mt-6">
        <Link
          href="/negocios"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Explorar Negocios
        </Link>
      </div>
    </div>
  );
}
