import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

function buildDatabaseUrl(): string {
  const { DB_HOST, DB_NAME, DB_PORT, DB_USER, DB_PASSWORD } = process.env;
  return `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=require`;
}

const pool = new Pool({ connectionString: buildDatabaseUrl() });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminRole = await prisma.role.upsert({
    where: { name: "Admin" },
    update: {},
    create: { name: "Admin" },
  });

  const doctorRole = await prisma.role.upsert({
    where: { name: "Doctor" },
    update: {},
    create: { name: "Doctor" },
  });

  console.log({ adminRole, doctorRole });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
