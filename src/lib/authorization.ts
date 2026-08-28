export function canAccessDocument(ownerId: string, userId: string, sharedUserIds: Iterable<string>) {
  return ownerId === userId || new Set(sharedUserIds).has(userId);
}

export function canRenameDocument(ownerId: string, userId: string) {
  return ownerId === userId;
}

export const canManageSharing = canRenameDocument;
