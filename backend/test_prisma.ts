import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  try {
    const result = await prisma.$queryRaw`SELECT current_database()`;
    console.log("Connected to:", result);
    const tables = await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`;
    console.log("Tables:", tables);
    const count = await prisma.usuario.count();
    console.log("User count:", count);
  } catch (e) {
    console.error("ERR:", e.message);
  } finally {
    await prisma.$disconnect();
  }
}
main();
