"use server";

import { getCurrentUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

const MAX_CONTENT_BYTES = 2_097_152;

export async function saveDocumentContent(documentId: string, content: unknown) {
  const serialized = JSON.stringify(content);
  if (new TextEncoder().encode(serialized).byteLength > MAX_CONTENT_BYTES) {
    return { ok: false, error: "Document content exceeds the 2 MiB limit." };
  }
  const user = await getCurrentUser();
  const document = await prisma.document.findFirst({ where: { id: documentId, OR: [{ ownerId: user.id }, { shares: { some: { userId: user.id } } }] }, select: { id: true } });
  if (!document) return { ok: false, error: "Document not found." };
  await prisma.document.update({ where: { id: document.id }, data: { content: content as never, lastSavedById: user.id } });
  return { ok: true };
}
