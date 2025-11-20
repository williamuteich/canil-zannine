-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SocialMedia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plataform" TEXT NOT NULL,
    "link" TEXT,
    "value" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_SocialMedia" ("createdAt", "id", "link", "plataform", "status", "updatedAt", "value") SELECT "createdAt", "id", "link", "plataform", "status", "updatedAt", "value" FROM "SocialMedia";
DROP TABLE "SocialMedia";
ALTER TABLE "new_SocialMedia" RENAME TO "SocialMedia";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
