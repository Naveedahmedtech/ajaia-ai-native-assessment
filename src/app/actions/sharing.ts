"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

export async function shareDocument(formData: FormData) {
  const documentId = formData.get("documentId"); const userId = formData.get("userId");
  if (typeof documentId !== "string" || typeof userId !== "string") return;
  const owner = await getCurrentUser();
  const document = await prisma.document.findFirst({ where: { id: documentId, ownerId: owner.id }, select: { id: true } });
  if (!document || userId === owner.id) return;
  const recipient = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
  if (!recipient) return;
  await prisma.documentShare.upsert({ where: { documentId_userId: { documentId: document.id, userId } }, update: {}, create: { documentId: document.id, userId } });
  revalidatePath(`/documents/${document.id}`);
}
