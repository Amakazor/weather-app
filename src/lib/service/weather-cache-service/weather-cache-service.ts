import {
  prisma,
  PrismaClient,
  PrismaPromise,
  WeatherCache,
} from "@prisma/client";

type genericFunction = <T extends any>() => PrismaPromise<T> & {
  [prisma]: true;
};

export class WeatherCacheService {
  private constructor() {}

  private static prisma: PrismaClient = new PrismaClient();

  static getCached = async (
    latitude: number,
    longitude: number
  ): Promise<WeatherCache | null> =>
    await WeatherCacheService.prisma.weatherCache.findUnique({
      where: { latitude_longitude: { latitude, longitude } },
    });

  static addToCache = async (
    latitude: number,
    longitude: number,
    data: string
  ) => {
    await WeatherCacheService.prisma.weatherCache.upsert({
      where: { latitude_longitude: { latitude, longitude } },
      create: { weather: data, longitude, latitude, cachedAt: new Date() },
      update: { weather: data, cachedAt: new Date() },
    });
  };
}
