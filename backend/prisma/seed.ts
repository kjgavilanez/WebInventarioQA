import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Verifica si ya existe el admin
  const adminExiste = await prisma.usuario.findUnique({
    where: { email: "admin@inventario.com" },
  });

  if (!adminExiste) {
    const hash = await bcrypt.hash("admin123", 10);
    await prisma.usuario.create({
      data: {
        nombre: "Admin",
        email: "admin@inventario.com",
        password: hash,
        rol: "ADMIN",
      },
    });
    console.log("✅ Usuario admin creado");
  } else {
    console.log("ℹ️ Usuario admin ya existe");
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });