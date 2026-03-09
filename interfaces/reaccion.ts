export interface Reaccion {
  id: bigint;
  tipo: string;
  usuarioId: bigint;
  publicacionId: bigint;
  usuarioNombre?: string;
}
