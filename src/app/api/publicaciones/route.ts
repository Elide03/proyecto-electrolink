import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: listar publicaciones
export async function GET() {
  try {
    const publicaciones = await prisma.publicacion.findMany({
      include: { autor: true, reacciones: true },
      orderBy: { fecha_creacion: "desc" },
    });

    // Convertir BigInt a Number
    const safe = publicaciones.map((p) => ({
      ...p,
      id: Number(p.id),
      autorId: Number(p.autorId),
      autor: p.autor ? { ...p.autor, id: Number(p.autor.id) } : null,
      reacciones: p.reacciones.map((r) => ({
        ...r,
        id: Number(r.id),
        usuarioId: Number(r.usuarioId),
        publicacionId: Number(r.publicacionId),
      })),
    }));

    return NextResponse.json(safe);
  } catch (error: any) {
    console.error("Error en GET publicaciones:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Crear publicación
export async function POST(req: Request) {
  const { titulo, contenido, autorId } = await req.json();
  try {
    const nueva = await prisma.publicacion.create({
      data: { titulo, contenido, autorId },
    });
    return NextResponse.json(nueva);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear publicación" },
      { status: 400 }
    );
  }
}

// Editar publicación
export async function PUT(req: Request) {
  try {
    const { id, titulo, contenido } = await req.json();

    // Validación
    if (!id || !titulo || !contenido) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    // Conversión de BigInt/Number
    const actualizada = await prisma.publicacion.update({
      where: { id: Number(id) }, // 👈 convierte aquí
      data: { titulo, contenido },
    });

    // Convierte BigInt a Number antes de devolver
    return NextResponse.json({
      ...actualizada,
      id: Number(actualizada.id),
      autorId: Number(actualizada.autorId),
    });
  } catch (error: any) {
    console.error("Error en PUT publicaciones:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Eliminar publicación
export async function DELETE(req: Request) {
  const { id } = await req.json();
  try {
    // Borra reacciones asociadas
    await prisma.reaccion.deleteMany({
      where: { publicacionId: Number(id) },
    });

    // Ahora sí borra la publicación
    await prisma.publicacion.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error en DELETE publicaciones:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
