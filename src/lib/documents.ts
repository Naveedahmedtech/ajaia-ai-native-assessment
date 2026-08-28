import { prisma } from "@/lib/prisma";
export { normalizeTitle } from "@/lib/title";

export const EMPTY_DOCUMENT = { type: "doc", content: [] };

export async function getAccessibleDocument(documentId: string, userId: string) {
  return prisma.document.findFirst({
    where: { id: documentId, OR: [{ ownerId: userId }, { shares: { some: { userId } } }] },
    include: { owner: { select: { name: true } }, shares: { select: { userId: true } } },
  });
}
