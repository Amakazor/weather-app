import React from "react";

import {
  LocalStorageNotNullDatum,
  LocalStorageWeatherData,
} from "../hooks/use-weather";
import { WeatherModel } from "../models/weather-model";

export const WeatherContext = React.createContext<{
  isLoading: boolean;
  data: (WeatherModel | undefined)[];
  locations: LocalStorageWeatherData;
  addLocation: (newLocation: LocalStorageNotNullDatum) => void;
  error: any;
  removeLocation: (toRemove: 0 | 1 | 2) => void;
}>({
  locations: [null, null, null, null],
  data: [undefined, undefined, undefined],
  error: undefined,
  isLoading: true,
  addLocation: () => {},
  removeLocation: () => {},
});
