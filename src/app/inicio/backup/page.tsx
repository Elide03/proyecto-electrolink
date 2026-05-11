"use client";

import { useEffect, useState } from "react";

export default function BackupPage() {
  const [tipoUsuario, setTipoUsuario] = useState<string | null>(null);
  const [descargando, setDescargando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    // Recuperar el rol desde localStorage (guardado en LoginPage como "rol")
    const tipo = localStorage.getItem("rol");
    setTipoUsuario(tipo);
  }, []);

  const handleBackup = async () => {
    setDescargando(true);
    setMensaje("");

    try {
      const res = await fetch("/api/backup", {
        headers: { "x-user-role": tipoUsuario || "" },
      });

      if (!res.ok) {
        setMensaje("❌ No autorizado o error en el backup.");
        setDescargando(false);
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "backup.csv";
      a.click();
      window.URL.revokeObjectURL(url);

      setMensaje("✅ Backup descargado correctamente.");
    } catch (error) {
      setMensaje("⚠️ Error al generar el backup.");
    } finally {
      setDescargando(false);
    }
  };

  // Mientras se carga el rol
  if (tipoUsuario === null) {
    return (
      <main className="flex flex-col items-center justify-center h-full text-gray-300">
        <p className="text-gray-400">Cargando permisos...</p>
      </main>
    );
  }

  // Si no es administrador
  if (tipoUsuario?.toLowerCase() !== "administrador") {
    return (
      <main className="flex flex-col items-center justify-center h-full text-gray-300">
        <h1 className="text-2xl font-semibold text-red-500 mb-4">
          Acceso restringido
        </h1>
        <p className="text-gray-400">
          Esta sección solo está disponible para administradores.
        </p>
      </main>
    );
  }

  // Interfaz para administrador
  return (
    <main className="flex flex-col items-center justify-center h-full space-y-6 text-gray-200">
      <h1 className="text-3xl font-bold text-green-400">
        Backup de Base de Datos
      </h1>
      <p className="text-gray-400 text-center max-w-md">
        Descarga un respaldo completo de los datos del sistema para auditorías o
        seguridad.
      </p>

      <button
        onClick={handleBackup}
        disabled={descargando}
        className={`px-6 py-3 rounded-md font-semibold transition ${
          descargando
            ? "bg-green-800 text-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
      >
        {descargando ? "Generando backup..." : "📥 Descargar Backup"}
      </button>

      {mensaje && <p className="text-sm text-gray-400">{mensaje}</p>}
    </main>
  );
}
