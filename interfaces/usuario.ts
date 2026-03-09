export interface Usuario {
  id: bigint;
  nombre: string;
  correo: string;
  foto?: string | null;
  provincia?: string | null;
  tipo_usuario: string;
}
