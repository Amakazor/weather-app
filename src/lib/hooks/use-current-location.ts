import { useEffect, useState } from "react";
import { z } from "zod";

export const localStorageNotNullDatum = z
  .string()
  .transform((datum) => parseInt(datum));

export type LocalStorageCurrentLocationDatum = z.infer<
  typeof localStorageNotNullDatum
>;
const retrieveWeatherFromLocalStorage =
  (): LocalStorageCurrentLocationDatum => {
    if (typeof window === "undefined") return 0;

    try {
      return localStorageNotNullDatum.parse(
        localStorage.getItem("currentLocation") as string
      );
    } catch (e) {
      const data = 0;
      localStorage.setItem("currentLocation", JSON.stringify(data));
      return data;
    }
  };

export const useCurrentLocation = () => {
  const [location, setLocation] = useState(retrieveWeatherFromLocalStorage());

  useEffect(() => {
    if (typeof window !== undefined) {
      localStorage.setItem("currentLocation", location.toString());
    }
  }, [location]);

  return { location, setLocation };
};
