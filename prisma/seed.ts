import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL!,
    },
  },
} as any);

async function main() {
  await prisma.$connect();
  console.log("Conexión OK ✅");

  // Crear usuario diegon como administrador
  const diegon = await prisma.usuario.create({
    data: {
      nombre: "diegon",
      correo: "admin2@electrolink.cu",
      password: "1234567890",
      tipo_usuario: "administrador",
    },
  });

  console.log("✅ Usuario creado:", diegon);
}

main()
  .then(() => {
    console.log("Seed ejecutado correctamente ✅");
  })
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
