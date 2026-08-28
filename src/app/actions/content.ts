"use server";

import { getCurrentUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

const MAX_CONTENT_BYTES = 2_097_152;

export async function saveDocumentContent(documentId: string, serialized: string) {
  if (typeof serialized !== "string" || new TextEncoder().encode(serialized).byteLength > MAX_CONTENT_BYTES) {
    return { ok: false, error: "Document content exceeds the 2 MiB limit." };
  }
  let content: unknown;
  try { content = JSON.parse(serialized); } catch { return { ok: false, error: "Invalid document content." }; }
  const user = await getCurrentUser();
  const document = await prisma.document.findFirst({ where: { id: documentId, OR: [{ ownerId: user.id }, { shares: { some: { userId: user.id } } }] }, select: { id: true } });
  if (!document) return { ok: false, error: "Document not found." };
  await prisma.$transaction([
    prisma.document.update({ where: { id: document.id }, data: { content: content as never, lastSavedById: user.id } }),
    prisma.documentVersion.create({ data: { documentId: document.id, content: content as never } }),
  ]);
  return { ok: true };
}
