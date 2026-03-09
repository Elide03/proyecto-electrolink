"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
  // Crear usuarios
  const admin = await prisma.usuario.create({
    data: {
      nombre: "Administrador",
      correo: "admin@electrolink.cu",
      contraseña: "123456",
      tipo_usuario: "administrador",
    },
  });
  const conductor = await prisma.usuario.create({
    data: {
      nombre: "Diego",
      correo: "diego@electrolink.cu",
      contraseña: "123456",
      tipo_usuario: "conductor",
    },
  });
  const negocioUser = await prisma.usuario.create({
    data: {
      nombre: "Empresa Habana",
      correo: "empresa@electrolink.cu",
      contraseña: "123456",
      tipo_usuario: "negocio",
    },
  });
  // Crear negocio
  const negocio = await prisma.negocio.create({
    data: {
      nombre_empresa: "ElectroCarga Habana",
      direccion: "Vedado, La Habana",
      telefono: "555-1234",
      correo_contacto: "contacto@electrocarga.cu",
      horario_general: "8am - 8pm",
      usuarioId: negocioUser.id,
    },
  });
  // Crear cargador
  await prisma.cargador.create({
    data: {
      tipo_conector: "CCS",
      potencia: 50,
      horario_especifico: "24h",
      negocioId: negocio.id,
    },
  });
  // Crear publicación
  const publicacion = await prisma.publicacion.create({
    data: {
      titulo: "Nueva estación en Vedado",
      contenido: "Se inauguró un cargador rápido de 50kW en el Vedado ⚡🚗",
      autorId: admin.id,
    },
  });
  // Crear reacción
  await prisma.reaccion.create({
    data: {
      tipo: "like",
      usuarioId: conductor.id,
      publicacionId: publicacion.id,
    },
  });
  // Crear comentario en negocio
  await prisma.comentarioNegocio.create({
    data: {
      contenido: "Excelente servicio, muy rápido.",
      usuarioId: conductor.id,
      negocioId: negocio.id,
    },
  });
  // Crear calificación
  await prisma.calificacion.create({
    data: {
      estrellas: 5,
      usuarioId: conductor.id,
      negocioId: negocio.id,
    },
  });
}
main()
  .then(() => {
    console.log("Seed ejecutado correctamente ✅");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
