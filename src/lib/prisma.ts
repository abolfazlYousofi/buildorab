import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prisma: PrismaClient;

// بررسی اینکه آیا از Turso استفاده می‌کنیم یا لوکال
const isTurso = process.env.TURSO_DATABASE_URL && process.env.TURSO_DATABASE_URL.startsWith("libsql://");

if (isTurso) {
  // در نسخه جدید، آبجکت تنظیمات را مستقیماً پاس می‌دهیم
  const adapter = new PrismaLibSql({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });
  prisma = new PrismaClient({ adapter });
} else {
  // برای توسعه لوکال
  prisma = new PrismaClient({
    log: ["error", "warn"],
  });
}

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };