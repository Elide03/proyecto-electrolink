// src/pages/api/backup.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getUsuariosMock } from "@/lib/db/db"; // ahora usamos los mocks
import { Parser } from "json2csv";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const tipoUsuario = req.headers["x-user-role"]; // o desde sesión
  if (tipoUsuario !== "administrador") {
    return res.status(403).json({ error: "No autorizado" });
  }

  const data = await getUsuariosMock(); // datos simulados
  const parser = new Parser();
  const csv = parser.parse(data);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=backup.csv");
  res.status(200).send(csv);
}
