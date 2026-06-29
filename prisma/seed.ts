import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
