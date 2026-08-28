import { describe, expect, it } from "vitest";
import { normalizeTitle } from "./title";

describe("document title validation", () => {
  it("trims a valid title", () => expect(normalizeTitle("  Product Ideas  ")).toBe("Product Ideas"));
  it("rejects an empty title", () => expect(() => normalizeTitle("   ")).toThrow());
  it("rejects a title over 120 characters", () => expect(() => normalizeTitle("a".repeat(121))).toThrow());
});
