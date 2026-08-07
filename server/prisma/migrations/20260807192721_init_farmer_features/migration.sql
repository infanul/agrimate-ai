-- CreateTable
CREATE TABLE "Crop" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "plantingDate" DATETIME NOT NULL,
    "expectedHarvest" DATETIME,
    "farmerId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Soil" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "ph" REAL,
    "moisture" REAL,
    "location" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "farmerId" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL
);
