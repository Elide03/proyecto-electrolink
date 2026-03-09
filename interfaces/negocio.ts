import type { Cargador } from "./cargador";

export interface Negocio {
  id: bigint;
  nombre_empresa: string;
  direccion: string;
  telefono: string;
  cargadores: Cargador[];
}
