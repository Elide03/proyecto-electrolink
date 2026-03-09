import type { Negocio } from "./negocio";

export interface Cargador {
  id: bigint;
  tipo_conector: string;
  potencia: number;
  horario_especifico: string;
  negocioId: bigint;
  negocio?: Negocio; // opcional, si incluyes la relación en la consulta
}
