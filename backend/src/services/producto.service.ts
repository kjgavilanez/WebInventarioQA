import prisma from "../prisma";

export const obtenerProductos = async () => {
  return prisma.producto.findMany({
    include: { categoria: true, creadoPor: { select: { nombre: true } } },
    orderBy: { creadoEn: "desc" },
  });
};

export const obtenerProductoPorId = async (id: number) => {
  return prisma.producto.findUnique({
    where: { id },
    include: {
      categoria: true,
      creadoPor: {
        select: { nombre: true },
      },
    },
  });
};

export const crearProducto = async (data: {
  nombre: string;
  precio: number;
  stock: number;
  descripcion?: string;
  imagenUrl?: string;
  categoriaId: number;
  usuarioId: number;
}) => {
  return prisma.producto.create({ data });
};

export const actualizarProducto = async (id: number, data: {
  nombre?: string;
  precio?: number;
  stock?: number;
  descripcion?: string;
  imagenUrl?: string;
  categoriaId?: number;
}) => {
  return prisma.producto.update({ where: { id }, data });
};

export const eliminarProducto = async (id: number) => {
  return prisma.producto.delete({ where: { id } });
};