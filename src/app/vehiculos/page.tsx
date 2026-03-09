import { prisma } from "@/lib/prisma";
import { Vehiculo } from "@/interfaces/vehiculo";

export default async function VehiculosPage() {
  const vehiculos: Vehiculo[] = await prisma.vehiculo.findMany({
    include: {
      usuario: {
        select: { id: true, nombre: true, correo: true },
      },
    },
  });

  return (
    <div>
      <h1>Vehículos</h1>
      <ul>
        {vehiculos.map((v) => (
          <li key={v.id.toString()}>
            <p>
              <strong>Marca:</strong> {v.marca}
            </p>
            <p>
              <strong>Modelo:</strong> {v.modelo}
            </p>
            <p>
              <strong>Año:</strong> {v.anio}
            </p>
            <p>
              <strong>Batería:</strong> {v.bateria}
            </p>
            <p>
              <strong>Autonomía:</strong> {v.autonomia} km
            </p>
            <p>
              <strong>Conector:</strong> {v.tipo_conector}
            </p>
            <p>
              <strong>Usuario:</strong> {v.usuario?.nombre} ({v.usuario?.correo}
              )
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
