// components/ChargerCard.tsx
interface ChargerCardProps {
  id: bigint;
  tipo_conector: string;
  potencia: string;
  horario_especifico: string;
}

export default function ChargerCard({
  id,
  tipo_conector,
  potencia,
  horario_especifico,
}: ChargerCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h2 className="text-lg font-bold text-green-700">
        Cargador #{id.toString()}
      </h2>
      <p className="text-sm text-gray-500">Conector: {tipo_conector}</p>
      <p className="mt-2 text-gray-700">Potencia: {potencia}</p>
      <p className="mt-1 text-gray-700">Horario: {horario_especifico}</p>
    </div>
  );
}
