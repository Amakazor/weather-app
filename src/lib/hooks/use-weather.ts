import { useEffect, useState } from "react";
import useSWR from "swr";
import { z } from "zod";

import { WeatherDto } from "../../pages/api/secure/weather/dto/weather-dto";
import { WeatherModel } from "../models/weather-model";
import { AxiosFetcher } from "../utils/axios-fetcher/axios-fetcher";

export const localStorageNotNullDatum = z.object({
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});
export type LocalStorageNotNullDatum = z.infer<typeof localStorageNotNullDatum>;

const localStorageDatum = z.union([localStorageNotNullDatum, z.null()]);
export type LocalStorageWeatherDatum = z.infer<typeof localStorageDatum>;

const localStorageData = z.array(localStorageDatum).length(3);
export type LocalStorageWeatherData = z.infer<typeof localStorageData>;

const retrieveWeatherFromLocalStorage = (): LocalStorageWeatherData => {
  if (typeof window === "undefined") return [null, null, null /*, null*/];

  try {
    return localStorageData.parse(
      JSON.parse(localStorage.getItem("locations") as string)
    );
  } catch (e) {
    const data = [null, null, null];

    localStorage.setItem("locations", JSON.stringify(data));

    return data;
  }
};

export const useWeather = () => {
  const [locations, setLocations] = useState<LocalStorageWeatherData>(
    retrieveWeatherFromLocalStorage()
  );

  useEffect(() => {
    console.log(locations);
    if (typeof window !== undefined) {
      localStorage.setItem("locations", JSON.stringify(locations));
    }
  }, [JSON.stringify(locations)]);

  const { data: data0, error: error1 } = useSWR<WeatherDto>(
    locations[0]
      ? [
          "/api/secure/weather",
          {
            latitude: locations[0].latitude,
            longitude: locations[0].longitude,
          },
        ]
      : null,
    AxiosFetcher.fetcher,
    { refreshInterval: 1000 }
  );

  const { data: data1, error: error2 } = useSWR<WeatherDto>(
    locations[1]
      ? [
          "/api/secure/weather",
          {
            latitude: locations[1].latitude,
            longitude: locations[1].longitude,
          },
        ]
      : null,
    AxiosFetcher.fetcher,
    { refreshInterval: 1000 }
  );

  const { data: data2, error: error3 } = useSWR<WeatherDto>(
    locations[2]
      ? [
          "/api/secure/weather",
          {
            latitude: locations[2].latitude,
            longitude: locations[2].longitude,
          },
        ]
      : null,
    AxiosFetcher.fetcher,
    { refreshInterval: 1000 }
  );

  const data = [
    data0 ? WeatherModel.fromDto(data0, locations[0]?.name ?? "") : undefined,
    data1 ? WeatherModel.fromDto(data1, locations[1]?.name ?? "") : undefined,
    data2 ? WeatherModel.fromDto(data2, locations[2]?.name ?? "") : undefined,
  ];

  console.log("data", data);
  console.log("locations", locations);

  const error = error1 || error2 || error3;
  const isLoading =
    typeof window === "undefined" ||
    (data.find((datum) => datum !== undefined) === undefined &&
      locations.find((location) => location !== null) !== undefined);

  const addLocation = (newLocation: LocalStorageNotNullDatum) => {
    if (
      locations.find((location) => location === null) !== undefined &&
      !locations.find(
        (location) =>
          location &&
          location.longitude === newLocation.longitude &&
          location.latitude === newLocation.latitude
      )
    ) {
      setLocations(() => {
        locations[
          locations.indexOf(
            locations.find(
              (location) => location === null
            ) as LocalStorageNotNullDatum
          )
        ] = newLocation;
        return locations;
      });
    }
  };

  const removeLocation = (toRemove: 0 | 1 | 2) => {
    console.log(toRemove);
    setLocations(() =>
      locations.map((location, index) => (index === toRemove ? null : location))
    );
  };

  return { locations, data, error, isLoading, addLocation, removeLocation };
};
