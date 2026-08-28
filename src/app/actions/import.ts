"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";
import { normalizeTitle } from "@/lib/documents";
import { prisma } from "@/lib/prisma";

const MAX_BYTES = 1_048_576;

export async function importTextDocument(formData: FormData) {
  const file = formData.get("file");
  if (!(file instanceof File) || !/\.txt$/i.test(file.name) || file.size > MAX_BYTES) return;
  let text: string;
  try { text = new TextDecoder("utf-8", { fatal: true }).decode(await file.arrayBuffer()); } catch { return; }
  if (!text.trim() || text.includes("\0")) return;
  const stem = file.name.replace(/\.txt$/i, "");
  let title = "Untitled Document";
  try { title = normalizeTitle(stem); } catch { /* use default */ }
  const content = { type: "doc", content: text.split(/\r?\n\r?\n/).map((paragraph) => ({ type: "paragraph", content: paragraph ? [{ type: "text", text: paragraph }] : [] })) };
  const user = await getCurrentUser();
  const document = await prisma.document.create({ data: { title, content, ownerId: user.id } });
  redirect(`/documents/${document.id}`);
}
