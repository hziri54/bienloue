/*
  Warnings:

  - You are about to drop the `Bail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Logement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Bail";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Logement";
PRAGMA foreign_keys=on;
