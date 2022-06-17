import { useState } from "react";
import useSWR from "swr";

import { LocationDto } from "../../pages/api/open/location/dto/location-dto";
import { AxiosFetcher } from "../utils/axios-fetcher/axios-fetcher";
import { useDebounce } from "./use-debounce";

export const useLocalizationSearch = (query: string) => {
  const [queryState, setQueryState] = useState<string>(query);

  useDebounce(query, (data: string) => setQueryState(() => data), 200);

  const { data, error } = useSWR<LocationDto[]>(
    queryState ? ["api/open/location", { query: queryState }] : null,
    AxiosFetcher.fetcher,
    { suspense: false }
  );
  const isLoading = !data && !error;

  return { data, error, isLoading };
};
