import { PrismaClient } from "@prisma/client";

let db;

// Check if we're in a non-production environment and use a global variable to reuse the Prisma client
if (process.env.NODE_ENV !== "production") {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  db = global.prisma;
} else {
  db = new PrismaClient();
}

export default db;
