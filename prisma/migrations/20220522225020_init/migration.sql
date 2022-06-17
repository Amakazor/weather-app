-- CreateTable
CREATE TABLE "WeatherCache" (
    "cachedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "latitude" REAL NOT NULL,
    "longtitude" REAL NOT NULL,
    "weather" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "WeatherCache_latitude_longtitude_key" ON "WeatherCache"("latitude", "longtitude");
