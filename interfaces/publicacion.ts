import type { Reaccion } from "./reaccion";

export interface Publicacion {
  id: bigint;
  titulo: string;
  contenido: string;
  autorId: bigint;
  autorNombre?: string;
  reacciones: Reaccion[];
}
