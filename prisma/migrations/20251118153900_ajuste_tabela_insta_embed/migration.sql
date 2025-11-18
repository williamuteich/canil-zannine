/*
  Warnings:

  - You are about to drop the column `pedigree` on the `Product` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `InstaEmbed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `about` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InstaEmbed" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_InstaEmbed" ("id", "link", "title") SELECT "id", "link", "title" FROM "InstaEmbed";
DROP TABLE "InstaEmbed";
ALTER TABLE "new_InstaEmbed" RENAME TO "InstaEmbed";
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "color" TEXT,
    "ageMonths" INTEGER,
    "weight" REAL,
    "vaccinated" BOOLEAN NOT NULL DEFAULT false,
    "dewormed" BOOLEAN NOT NULL DEFAULT false,
    "about" TEXT NOT NULL,
    "characteristics" TEXT,
    "careInstructions" TEXT,
    "history" TEXT,
    "primaryImage" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("ageMonths", "breed", "color", "createdAt", "dewormed", "gender", "id", "name", "primaryImage", "updatedAt", "vaccinated", "weight") SELECT "ageMonths", "breed", "color", "createdAt", "dewormed", "gender", "id", "name", "primaryImage", "updatedAt", "vaccinated", "weight" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
