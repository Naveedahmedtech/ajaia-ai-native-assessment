import { describe, expect, it } from "vitest";
import { canAccessDocument, canManageSharing, canRenameDocument } from "./authorization";

describe("document authorization", () => {
  const owner = "alex"; const shared = "sam"; const unshared = "jordan";
  it("allows an owner to read and edit", () => expect(canAccessDocument(owner, owner, [shared])).toBe(true));
  it("allows a shared user to read and edit", () => expect(canAccessDocument(owner, shared, [shared])).toBe(true));
  it("rejects an unshared user", () => expect(canAccessDocument(owner, unshared, [shared])).toBe(false));
  it("allows only the owner to rename", () => { expect(canRenameDocument(owner, owner)).toBe(true); expect(canRenameDocument(owner, shared)).toBe(false); });
  it("allows only the owner to manage sharing", () => { expect(canManageSharing(owner, owner)).toBe(true); expect(canManageSharing(owner, shared)).toBe(false); });
});
