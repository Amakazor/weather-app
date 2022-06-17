import axios from "axios";

import { GetParameters } from "../../handlers/get-parameters-schema";

export class NominatimClient {
  private static readonly baseUrl = "https://nominatim.openstreetmap.org/";
  private static readonly endpointUrl = `${NominatimClient.baseUrl}search`;

  private static readonly constantParameters = {
    format: "jsonv2",
    dedupe: "1",
  };

  static get = async (parameters: GetParameters) => {
    const allParameters = {
      ...NominatimClient.constantParameters,
      q: parameters.query,
    };

    return await axios.get(NominatimClient.endpointUrl, {
      params: allParameters,
    });
  };
}
