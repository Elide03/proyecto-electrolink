-- Limpiar todo
TRUNCATE TABLE "Reaccion", "ComentarioNegocio", "Calificacion", "Cargador", "Publicacion", "Negocio", "Usuario" RESTART IDENTITY CASCADE;

-- Usuarios
INSERT INTO "Usuario" ("nombre", "correo", "password", "tipo_usuario")
VALUES 
  ('Administrador', 'admin@electrolink.cu', '123456', 'administrador'),
  ('Diego', 'diego@electrolink.cu', '123456', 'conductor'),
  ('Empresa Habana', 'empresa@electrolink.cu', '123456', 'negocio');

-- Negocio (usuario Empresa Habana → id=3)
INSERT INTO "Negocio" ("nombre_empresa", "direccion", "telefono", "correo_contacto", "horario_general", "usuarioId")
VALUES ('ElectroCarga Habana', 'Vedado, La Habana', '555-1234', 'contacto@electrocarga.cu', '8am - 8pm', 3);

-- Cargador (negocio id=1)
INSERT INTO "Cargador" ("tipo_conector", "potencia", "horario_especifico", "negocioId")
VALUES ('CCS', 50, '24h', 1);

-- Publicación (autor Administrador → id=1)
INSERT INTO "Publicacion" ("titulo", "contenido", "autorId")
VALUES ('Nueva estación en Vedado', 'Se inauguró un cargador rápido de 50kW en el Vedado ⚡🚗', 1);

-- Reacción (usuario Diego → id=2, publicación id=1)
INSERT INTO "Reaccion" ("tipo", "usuarioId", "publicacionId")
VALUES ('like', 2, 1);

-- Comentario (usuario Diego → id=2, negocio id=1)
INSERT INTO "ComentarioNegocio" ("contenido", "usuarioId", "negocioId")
VALUES ('Excelente servicio, muy rápido.', 2, 1);

-- Calificación (usuario Diego → id=2, negocio id=1)
INSERT INTO "Calificacion" ("estrellas", "usuarioId", "negocioId")
VALUES (5, 2, 1);
