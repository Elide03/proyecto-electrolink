"use client";

import { useState } from "react";
import { cargadores, vehiculos } from "@/lib/cargadoresMock";

export default function CargadoresPage() {
  const [modeloSeleccionado, setModeloSeleccionado] = useState<string>("");

  const vehiculo = vehiculos.find((v) => v.modelo === modeloSeleccionado);

  const cargadoresCompatibles = vehiculo
    ? cargadores.filter((c) =>
        vehiculo.conectoresCompatibles.includes(c.conector),
      )
    : [];

  return (
    <main className="p-6 text-gray-200">
      <h1 className="text-3xl font-bold text-green-400 mb-6">
        Buscar cargadores compatibles
      </h1>

      <select
        value={modeloSeleccionado}
        onChange={(e) => setModeloSeleccionado(e.target.value)}
        className="mb-6 px-4 py-2 rounded-md bg-[#121826] border border-gray-700 text-gray-200"
        aria-label="Selecciona tu modelo de vehículo"
      >
        <option value="">Selecciona tu modelo</option>
        {vehiculos.map((v) => (
          <option key={v.id} value={v.modelo}>
            {v.marca} {v.modelo}
          </option>
        ))}
      </select>

      {vehiculo && (
        <div className="grid md:grid-cols-2 gap-6">
          {cargadoresCompatibles.length > 0 ? (
            cargadoresCompatibles.map((c) => (
              <div
                key={c.id}
                className="bg-[#121826] p-4 rounded-lg shadow-md border border-gray-700"
              >
                <h2 className="text-xl font-semibold text-blue-400">
                  {c.nombre}
                </h2>
                <p className="text-gray-400">
                  {c.provincia} — {c.direccion}
                </p>
                <p className="mt-2">
                  ⚡ {c.potencia} kW — 🔌 {c.conector}
                </p>
                <p
                  className={`mt-1 font-semibold ${
                    c.estado === "disponible"
                      ? "text-green-400"
                      : c.estado === "ocupado"
                        ? "text-yellow-400"
                        : "text-red-400"
                  }`}
                >
                  {c.estado.toUpperCase()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">
              No hay cargadores compatibles disponibles para este modelo.
            </p>
          )}
        </div>
      )}
    </main>
  );
}
