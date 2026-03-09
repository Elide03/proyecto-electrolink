import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { nombre, correo, password, provincia, tipo_usuario } =
      await req.json();

    // Validación de campos obligatorios
    if (!nombre || !correo || !password) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    // Validación de longitud de contraseña
    if (password.length < 10) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 10 caracteres" },
        { status: 400 }
      );
    }

    // Verificar si ya existe un usuario con ese correo
    const existe = await prisma.usuario.findUnique({
      where: { correo },
    });

    if (existe) {
      return NextResponse.json(
        { error: "El correo ya está registrado" },
        { status: 400 }
      );
    }

    // Encriptar la contraseña
    const hashed = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos
    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        correo,
        password: hashed,
        provincia,
        tipo_usuario, // ⚡ siempre conductor
      },
    });

    // Respuesta exitosa (convertimos BigInt a string)
    return NextResponse.json({
      id: usuario.id.toString(),
      nombre: usuario.nombre,
      correo: usuario.correo,
      tipo_usuario: usuario.tipo_usuario,
    });
  } catch (error) {
    console.error("Error al registrar:", error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
