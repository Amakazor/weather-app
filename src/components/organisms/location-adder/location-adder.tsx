import { Suspense, useContext, useEffect, useState } from "react";

import { WeatherContext } from "../../../lib/context/weather.context";
import { useLocationAdding } from "../../../lib/hooks/use-location-adding";
import { Flex } from "../../atoms/flex";
import { Spinner } from "../../atoms/spinner/spinner";
import {
  LocationAddingForm,
  LocationAddingFormInputs,
} from "../../molecules/location-adding-form/location-adding-form";
import { LocationCardList } from "../../molecules/location-card-list/location-card-list";

export const LocationAdder = () => {
  const [query, setQuery] = useState<Partial<LocationAddingFormInputs>>({
    location: undefined,
    name: undefined,
  });

  useEffect(() => console.log(query), [query]);

  const { addLocation } = useContext(WeatherContext);
  const { stopAddingLocation } = useLocationAdding();

  return (
    <Flex flexDirection="column">
      <LocationAddingForm onChange={setQuery} />
      {query.location && (
        <Suspense fallback={<Spinner />}>
          <LocationCardList
            query={query.location}
            onLocationSelect={async (data) => {
              addLocation({
                ...data,
                name:
                  (query.name !== null && query.name !== ""
                    ? query.name
                    : query.location) ?? "",
              });
              await stopAddingLocation();
            }}
          />
        </Suspense>
      )}
    </Flex>
  );
};
