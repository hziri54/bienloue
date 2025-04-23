-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Logement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "surface" REAL NOT NULL,
    "loyerMensuel" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Bail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "signe" BOOLEAN NOT NULL DEFAULT false,
    "dateDebut" DATETIME NOT NULL,
    "dateFin" DATETIME,
    "logementId" INTEGER NOT NULL,
    "locataireId" INTEGER NOT NULL,
    CONSTRAINT "Bail_logementId_fkey" FOREIGN KEY ("logementId") REFERENCES "Logement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Bail_locataireId_fkey" FOREIGN KEY ("locataireId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
