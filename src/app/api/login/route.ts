import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { correo, password } = await req.json();

    // Buscar usuario por correo
    const usuario = await prisma.usuario.findUnique({
      where: { correo },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Validar contraseña
    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) {
      return NextResponse.json(
        { error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    // Devuelve datos básicos del usuario (convertimos BigInt a string)
    return NextResponse.json({
      id: usuario.id.toString(),
      nombre: usuario.nombre,
      correo: usuario.correo,
      tipo_usuario: usuario.tipo_usuario,
    });
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
