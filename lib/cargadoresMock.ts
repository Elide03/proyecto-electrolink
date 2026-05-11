export const cargadores = [
  {
    id: 1,
    nombre: "Estación Habana Centro",
    provincia: "La Habana",
    direccion: "Calle 23 y L, Vedado",
    potencia: 50,
    conector: "CCS Combo",
    estado: "disponible",
  },
  {
    id: 2,
    nombre: "Estación Cienfuegos Sur",
    provincia: "Cienfuegos",
    direccion: "Malecón #45",
    potencia: 22,
    conector: "Tipo 2",
    estado: "ocupado",
  },
  {
    id: 3,
    nombre: "Estación Santiago Express",
    provincia: "Santiago de Cuba",
    direccion: "Carretera Central km 5",
    potencia: 100,
    conector: "CHAdeMO",
    estado: "disponible",
  },
];

export const vehiculos = [
  {
    id: 1,
    marca: "Tesla",
    modelo: "Model 3",
    conectoresCompatibles: ["CCS Combo", "Tipo 2"],
  },
  {
    id: 2,
    marca: "Nissan",
    modelo: "Leaf",
    conectoresCompatibles: ["CHAdeMO", "Tipo 2"],
  },
  {
    id: 3,
    marca: "BYD",
    modelo: "Tang EV",
    conectoresCompatibles: ["CCS Combo"],
  },
];
