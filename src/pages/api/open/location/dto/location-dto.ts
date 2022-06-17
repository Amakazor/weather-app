import { NominatimResponseSchema } from "../clients/nominatim/nominatim-response-schema";

export type LocationDto = {
  name: string;
  latitude: number;
  longitude: number;
  licence: string;
};

export const dtoFromResponse = (
  response: NominatimResponseSchema
): LocationDto => ({
  name: response.display_name,
  latitude: response.lat,
  longitude: response.lon,
  licence: response.licence,
});
