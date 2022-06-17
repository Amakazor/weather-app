import { NextApiRequest } from "next";

import { ApiParser } from "../../../../../lib/api/api-parser";
import { WeatherCacheService } from "../../../../../lib/service/weather-cache-service/weather-cache-service";
import { OpenWeatherClient } from "../clients/open-weather/open-weather-client";
import { openWeatherResponseSchema } from "../clients/open-weather/open-weather-response-schema";
import { dtoFromResponse } from "../dto/weather-dto";
import { getParametersSchema } from "./get-parameters-schema";

export const handleGet = async (req: NextApiRequest) => {
  const parameters = ApiParser.parseParameters(getParametersSchema, req.query);

  const cachedValue = await WeatherCacheService.getCached(
    parameters.latitude,
    parameters.longitude
  );

  if (
    cachedValue &&
    cachedValue.cachedAt.getTime() > new Date().getTime() - 15 * 60 * 1000
  ) {
    return JSON.parse(cachedValue.weather);
  }
  const data = ApiParser.parseResponse(
    openWeatherResponseSchema,
    (await OpenWeatherClient.get(parameters)).data
  );

  const dto = dtoFromResponse(data);

  await WeatherCacheService.addToCache(
    parameters.latitude,
    parameters.longitude,
    JSON.stringify(dto)
  );

  return dto;
};
