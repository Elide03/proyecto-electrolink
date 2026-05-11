// src/lib/db.ts
// Mock de datos para pruebas sin conexión real a PostgreSQL

export const mockUsuarios = [
  {
    id: 1,
    nombre: "Carlos Pérez",
    correo: "carlos@example.com",
    password: "hashedpassword",
    provincia: "La Habana",
    tipo_usuario: "conductor",
    vehiculos: [
      {
        id: 1,
        marca: "Tesla",
        modelo: "Model 3",
        anio: 2022,
        bateria: "75 kWh",
        autonomia: 450,
        tipo_conector: "Tipo 2",
        usuarioId: 1,
      },
    ],
    publicaciones: [
      {
        id: 1,
        titulo: "Primera carga rápida",
        contenido: "Hoy probé un cargador de 50kW en el Vedado 🚗⚡",
        fecha_creacion: new Date(),
        autorId: 1,
        reacciones: [{ id: 1, tipo: "like", usuarioId: 2, publicacionId: 1 }],
      },
    ],
    auditorias: [
      {
        id: 1,
        accion: "Login exitoso",
        usuarioId: 1,
        fecha: new Date(),
      },
    ],
  },
  {
    id: 2,
    nombre: "Ana Gómez",
    correo: "ana@example.com",
    password: "hashedpassword",
    provincia: "Cienfuegos",
    tipo_usuario: "administrador",
    vehiculos: [],
    publicaciones: [],
    auditorias: [],
  },
];

// Funciones de prueba
export async function getUsuariosMock() {
  return mockUsuarios;
}

export async function getPublicacionesMock() {
  return mockUsuarios.flatMap((u) => u.publicaciones);
}

export async function crearRespaldoMock(ubicacion: string) {
  return {
    id: BigInt(Math.floor(Math.random() * 1000)),
    fecha: new Date(),
    ubicacion,
  };
}
