import Image from "next/image";

interface BusinessCardProps {
  id: bigint;
  nombre_empresa: string;
  direccion: string;
  telefono: string;
  correo_contacto: string;
  horario_general: string;
  resumen?: string;
  foto?: string | null; // 👈 opcional, URL de la imagen
}

export default function BusinessCard({
  id,
  nombre_empresa,
  direccion,
  telefono,
  correo_contacto,
  horario_general,
  resumen,
  foto,
}: BusinessCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 max-w-md mx-auto">
      {/* Imagen del negocio */}
      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
        {foto ? (
          <Image
            src={foto}
            alt={`Foto de ${nombre_empresa}`}
            width={400}
            height={200}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-sm text-gray-500">Sin imagen disponible</span>
        )}
      </div>

      {/* Nombre del negocio */}
      <h2 className="text-2xl font-bold text-blue-800 mb-2">
        {nombre_empresa}
      </h2>

      {/* Dirección */}
      <p className="text-sm text-gray-600 mb-1">{direccion}</p>

      {/* Teléfono */}
      <p className="text-gray-700">📞 {telefono}</p>

      {/* Correo de contacto */}
      <p className="text-gray-700">✉️ {correo_contacto}</p>

      {/* Horario general */}
      <p className="text-gray-700">🕒 {horario_general}</p>

      {/* Resumen opcional */}
      {resumen && (
        <p className="mt-2 text-sm text-gray-600 italic">{resumen}</p>
      )}
    </div>
  );
}
