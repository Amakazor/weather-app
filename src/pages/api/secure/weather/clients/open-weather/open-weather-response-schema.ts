import { z } from "zod";

export const openWeatherResponseSchema = z.object({
  lat: z.number(),
  lon: z.number(),
  timezone: z.string(),
  timezone_offset: z.number(),
  current: z.object({
    dt: z.number(),
    sunrise: z.number(),
    sunset: z.number(),
    temp: z.number(),
    feels_like: z.number(),
    pressure: z.number(),
    humidity: z.number(),
    dew_point: z.number(),
    uvi: z.number(),
    clouds: z.number(),
    visibility: z.number(),
    wind_speed: z.number(),
    wind_deg: z.number(),
    wind_gust: z.number().optional(),
    rain: z
      .object({
        "1h": z.number(),
      })
      .optional(),
    snow: z
      .object({
        "1h": z.number(),
      })
      .optional(),
    weather: z.array(
      z.object({
        id: z.number(),
        main: z.string(),
        description: z.string(),
        icon: z.string(),
      })
    ),
  }),
  hourly: z.array(
    z.object({
      dt: z.number(),
      temp: z.number(),
      feels_like: z.number(),
      pressure: z.number(),
      humidity: z.number(),
      dew_point: z.number(),
      uvi: z.number(),
      clouds: z.number(),
      visibility: z.number(),
      wind_speed: z.number(),
      wind_deg: z.number(),
      wind_gust: z.number().optional(),
      rain: z
        .object({
          "1h": z.number(),
        })
        .optional(),
      snow: z
        .object({
          "1h": z.number(),
        })
        .optional(),
      weather: z
        .array(
          z.object({
            id: z.number(),
            main: z.string(),
            description: z.string(),
            icon: z.string(),
          })
        )
        .length(1),
      pop: z.number(),
    })
  ),
  daily: z.array(
    z.object({
      dt: z.number(),
      sunrise: z.number(),
      sunset: z.number(),
      moonrise: z.number(),
      moonset: z.number(),
      moon_phase: z.number(),
      temp: z.object({
        day: z.number(),
        min: z.number(),
        max: z.number(),
        night: z.number(),
        eve: z.number(),
        morn: z.number(),
      }),
      feels_like: z.object({
        day: z.number(),
        night: z.number(),
        eve: z.number(),
        morn: z.number(),
      }),
      pressure: z.number(),
      humidity: z.number(),
      dew_point: z.number(),
      wind_speed: z.number(),
      wind_deg: z.number(),
      wind_gust: z.number().optional(),
      rain: z.number().optional(),
      snow: z.number().optional(),
      weather: z
        .array(
          z.object({
            id: z.number(),
            main: z.string(),
            description: z.string(),
            icon: z.string(),
          })
        )
        .length(1),
      clouds: z.number(),
      pop: z.number(),
      uvi: z.number(),
    })
  ),
  alerts: z
    .array(
      z.object({
        sender_name: z.string(),
        event: z.string(),
        start: z.number(),
        end: z.number(),
        description: z.string(),
        tags: z.array(z.string()),
      })
    )
    .optional(),
});

export type OpenWeatherResponse = z.infer<typeof openWeatherResponseSchema>;
