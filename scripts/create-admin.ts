import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "abolfazlyousufi83@gmail.com";
  const password = "Admin@Buildorab2026";
  const name = "Abolfazl Yousofi";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log("✓ Admin user already exists");
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

  console.log("✓ Admin user created:", user.email);
  console.log("  Password:", password);
  console.log("  ⚠️  Change the password after first login!");
}

main()
  .catch((e) => {
    console.error("✗ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });