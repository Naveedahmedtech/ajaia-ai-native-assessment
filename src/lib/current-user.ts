import { cookies } from "next/headers";
import { DEFAULT_DEMO_USER_EMAIL, CURRENT_USER_COOKIE } from "@/lib/demo-users";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const selectedUserId = cookieStore.get(CURRENT_USER_COOKIE)?.value;

  if (selectedUserId) {
    const selectedUser = await prisma.user.findUnique({ where: { id: selectedUserId } });

    if (selectedUser) {
      return selectedUser;
    }
  }

  const defaultUser = await prisma.user.findUnique({
    where: { email: DEFAULT_DEMO_USER_EMAIL },
  });

  if (!defaultUser) {
    throw new Error("Demo users are not seeded. Run the documented database seed command.");
  }

  return defaultUser;
}

export async function getDemoUsers() {
  return prisma.user.findMany({
    where: { email: { in: ["alex@example.com", "sam@example.com", "jordan@example.com"] } },
    orderBy: { email: "asc" },
  });
}
