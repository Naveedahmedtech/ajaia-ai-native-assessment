-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "lastSavedById" TEXT;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_lastSavedById_fkey" FOREIGN KEY ("lastSavedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
