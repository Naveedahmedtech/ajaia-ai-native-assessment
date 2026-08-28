import "dotenv/config";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { getAccessibleDocument } from "./documents";
import { prisma } from "./prisma";

const suffix = `test-${Date.now()}`;
let ownerId = ""; let sharedId = ""; let unsharedId = ""; let documentId = "";

beforeAll(async () => {
  const [owner, shared, unshared] = await Promise.all(["owner", "shared", "unshared"].map((name) => prisma.user.create({ data: { name, email: `${name}-${suffix}@example.test` } })));
  ownerId = owner.id; sharedId = shared.id; unsharedId = unshared.id;
  const document = await prisma.document.create({ data: { ownerId, title: "Integration test", content: { type: "doc", content: [] } } });
  documentId = document.id;
  await prisma.documentShare.create({ data: { documentId, userId: sharedId } });
});

afterAll(async () => { await prisma.document.delete({ where: { id: documentId } }); await prisma.user.deleteMany({ where: { id: { in: [ownerId, sharedId, unsharedId] } } }); await prisma.$disconnect(); });

describe("database-backed document access", () => {
  it("allows the owner", async () => expect(await getAccessibleDocument(documentId, ownerId)).not.toBeNull());
  it("allows a shared user", async () => expect(await getAccessibleDocument(documentId, sharedId)).not.toBeNull());
  it("rejects an unshared user", async () => expect(await getAccessibleDocument(documentId, unsharedId)).toBeNull());
});
