import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";

let prisma: PrismaClient;
const isTurso = process.env.TURSO_DATABASE_URL && process.env.TURSO_DATABASE_URL.startsWith("libsql://");

if (isTurso) {
  const adapter = new PrismaLibSql({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });
  prisma = new PrismaClient({ adapter });
} else {
  prisma = new PrismaClient();
}

async function main() {
  const email = "abolfazlyousufi83@gmail.com";
  const password = "Admin@Buildorab2026";
  const name = "Abolfazl Yousofi";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log("✓ Admin user already exists in this database");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: "OWNER",
    },
  });

  console.log("✓ Admin user created in Turso:", user.email);
  console.log("  Password:", password);
}

main()
  .catch((e) => {
    console.error("✗ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });