import { getCurrentUser } from "@/lib/current-user";
import { getAccessibleDocument } from "@/lib/documents";
import { tiptapToMarkdown } from "@/lib/markdown";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const [{ id }, user] = await Promise.all([params, getCurrentUser()]);
  const document = await getAccessibleDocument(id, user.id);
  if (!document) return new Response("Not found", { status: 404 });
  return new Response(tiptapToMarkdown(document.content as never), {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "Content-Disposition": `attachment; filename="${document.title.replace(/[^a-z0-9-_ ]/gi, "_")}.md"` },
  });
}
