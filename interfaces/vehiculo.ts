export interface Vehiculo {
  id: bigint; // Identificador único
  marca: string; // Marca del vehículo
  modelo: string; // Modelo
  anio: number; // Año de fabricación
  bateria: string; // Capacidad de batería (ej. "75 kWh")
  autonomia: number; // Autonomía en km
  tipo_conector: string; // Tipo de conector (ej. "CCS Combo")
  usuarioId: bigint; // Relación con Usuario
  usuario?: {
    id: bigint;
    nombre: string;
    correo: string;
  }; // Usuario asociado (opcional en include)
}
