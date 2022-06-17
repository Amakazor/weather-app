/*
  Warnings:

  - You are about to drop the column `longtitude` on the `WeatherCache` table. All the data in the column will be lost.
  - Added the required column `longitude` to the `WeatherCache` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WeatherCache" (
    "cachedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "weather" TEXT NOT NULL
);
INSERT INTO "new_WeatherCache" ("cachedAt", "latitude", "weather") SELECT "cachedAt", "latitude", "weather" FROM "WeatherCache";
DROP TABLE "WeatherCache";
ALTER TABLE "new_WeatherCache" RENAME TO "WeatherCache";
CREATE UNIQUE INDEX "WeatherCache_latitude_longitude_key" ON "WeatherCache"("latitude", "longitude");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
