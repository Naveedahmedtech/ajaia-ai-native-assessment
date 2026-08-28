"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";
import { EMPTY_DOCUMENT, normalizeTitle } from "@/lib/documents";
import { prisma } from "@/lib/prisma";

export async function createDocument() {
  const user = await getCurrentUser();
  const document = await prisma.document.create({ data: { title: "Untitled Document", content: EMPTY_DOCUMENT, ownerId: user.id } });
  redirect(`/documents/${document.id}`);
}

export async function renameDocument(formData: FormData) {
  const id = formData.get("documentId");
  const title = formData.get("title");
  if (typeof id !== "string" || typeof title !== "string") return;
  const user = await getCurrentUser();
  const document = await prisma.document.findFirst({ where: { id, ownerId: user.id }, select: { id: true } });
  if (!document) return;
  await prisma.document.update({ where: { id: document.id }, data: { title: normalizeTitle(title) } });
  revalidatePath("/");
  revalidatePath(`/documents/${id}`);
}
