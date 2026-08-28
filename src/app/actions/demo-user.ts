"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { CURRENT_USER_COOKIE } from "@/lib/demo-users";
import { prisma } from "@/lib/prisma";

export async function selectDemoUser(formData: FormData) {
  const userId = formData.get("userId");

  if (typeof userId !== "string") {
    return;
  }

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });

  if (!user) {
    return;
  }

  const cookieStore = await cookies();
  cookieStore.set(CURRENT_USER_COOKIE, user.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  revalidatePath("/");
}
