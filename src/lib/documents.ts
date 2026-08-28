import { prisma } from "@/lib/prisma";

export const EMPTY_DOCUMENT = { type: "doc", content: [] };

export function normalizeTitle(value: string) {
  const title = value.trim();
  if (!title || title.length > 120) throw new Error("Title must be between 1 and 120 characters.");
  return title;
}

export async function getAccessibleDocument(documentId: string, userId: string) {
  return prisma.document.findFirst({
    where: { id: documentId, OR: [{ ownerId: userId }, { shares: { some: { userId } } }] },
    include: { owner: { select: { name: true } } },
  });
}
