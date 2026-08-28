type Node = { type?: string; text?: string; attrs?: { level?: number }; content?: Node[] };

export function tiptapToMarkdown(document: Node) {
  return (document.content ?? []).map((node) => renderNode(node)).join("\n\n").trim() + "\n";
}

function renderNode(node: Node): string {
  if (node.type === "text") return node.text ?? "";
  const children = (node.content ?? []).map(renderNode).join("");
  if (node.type === "heading") return `${"#".repeat(node.attrs?.level ?? 1)} ${children}`;
  if (node.type === "bulletList") return (node.content ?? []).map((item) => `- ${renderNode(item)}`).join("\n");
  if (node.type === "orderedList") return (node.content ?? []).map((item, index) => `${index + 1}. ${renderNode(item)}`).join("\n");
  if (node.type === "listItem") return children;
  if (node.type === "hardBreak") return "\n";
  return children;
}
