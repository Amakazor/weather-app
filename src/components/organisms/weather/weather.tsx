import { AnimatePresence } from "framer-motion";
import { ReactNode, useContext, useEffect, useState } from "react";

import { WeatherContext } from "../../../lib/context/weather.context";
import { useLocationAdding } from "../../../lib/hooks/use-location-adding";
import {
  LocalStorageNotNullDatum,
  LocalStorageWeatherData,
} from "../../../lib/hooks/use-weather";
import { WeatherModel } from "../../../lib/models/weather-model";
import { Spinner } from "../../atoms/spinner/spinner";
import { WeatherContainer } from "../../atoms/weather-container";
import { AddLocationButton } from "../../molecules/add-location-button";
import { BigWeatherShowcase } from "../big-weather-showcase/big-weather-showcase";
import { LocationAdder } from "../location-adder/location-adder";
import { SmallWeatherShowcase } from "../small-weather-showcase/small-weather-showcase";

export type WeatherProps = {
  slot: 0 | 1 | 2;
  variant: "big" | "small";
};

export const Weather = ({ slot, variant, ...props }: WeatherProps) => {
  const [weatherData, setWeatherData] = useState<{
    isLoading: boolean;
    data: (WeatherModel | undefined)[];
    locations: LocalStorageWeatherData;
    addLocation: (newLocation: LocalStorageNotNullDatum) => void;
    error: any;
    removeLocation: (toRemove: 0 | 1 | 2) => void;
  } | null>(null);

  const weatherContext = useContext(WeatherContext);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWeatherData(weatherContext);
    }
  }, [JSON.stringify(weatherContext)]);

  const { isAddingLocation, startAddingLocation, stopAddingLocation } =
    useLocationAdding();

  const datum = weatherData?.data[slot];

  const getContent = (): ReactNode => {
    if (variant === "big" && isAddingLocation) return <LocationAdder />;
    else if (datum !== undefined && variant === "big")
      return <BigWeatherShowcase model={datum} />;
    else if (datum !== undefined && variant === "small")
      return <SmallWeatherShowcase model={datum} slot={slot} />;
    else
      return (
        <AddLocationButton
          size={variant}
          onClick={() =>
            isAddingLocation && datum !== undefined && variant === "small"
              ? stopAddingLocation()
              : startAddingLocation()
          }
        />
      );
  };

  return (
    <AnimatePresence>
      <WeatherContainer
        key={`${variant}${slot}`}
        areaName={`${variant}${variant === "big" ? 0 : slot}`}
        variant={variant}
        initial={variant === "big" ? "invisible" : undefined}
        animate={variant === "big" ? "visible" : undefined}
        exit={variant === "big" ? "exit" : undefined}
        {...props}
      >
        {weatherData?.isLoading ? <Spinner /> : getContent()}
      </WeatherContainer>
    </AnimatePresence>
  );
};
