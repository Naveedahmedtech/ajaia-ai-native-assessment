export function normalizeTitle(value: string) {
  const title = value.trim();
  if (!title || title.length > 120) throw new Error("Title must be between 1 and 120 characters.");
  return title;
}
