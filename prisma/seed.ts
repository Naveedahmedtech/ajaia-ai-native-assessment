import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const demoUsers = [
  { name: "Alex", email: "alex@example.com" },
  { name: "Sam", email: "sam@example.com" },
  { name: "Jordan", email: "jordan@example.com" },
] as const;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to seed demo users.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

async function main() {
  for (const user of demoUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: { name: user.name },
      create: user,
    });
  }
}

main()
  .then(() => console.info("Seeded Alex, Sam, and Jordan."))
  .finally(async () => prisma.$disconnect());
