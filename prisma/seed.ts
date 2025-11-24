import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "williamuteich14@gmail.com";
  const name = "zaninnie";
  const passwordPlain = "teste123";
  const passwordHash = await bcrypt.hash(passwordPlain, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name,
      email,
      password: passwordHash,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
