// src/types/comentario.ts
export interface Comentario {
  id: bigint;
  contenido: string;
  usuarioId: bigint;
  publicacionId: bigint;
  usuarioNombre?: string;
}
