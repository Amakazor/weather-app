import { NextApiRequest } from "next";

import { ApiParser } from "../../../../../lib/api/api-parser";
import { ArrayHelper } from "../../../../../lib/utils/array-helper/array-helper";
import { NominatimClient } from "../clients/nominatim/nominatim-client";
import { nominatimResponseSchema } from "../clients/nominatim/nominatim-response-schema";
import { dtoFromResponse } from "../dto/location-dto";
import { getParametersSchema } from "./get-parameters-schema";

export const handleGet = async (req: NextApiRequest) => {
  const parameters = ApiParser.parseParameters(getParametersSchema, req.query);

  const data = ApiParser.parseResponse(
    nominatimResponseSchema,
    (await NominatimClient.get(parameters)).data
  );

  return ArrayHelper.dedupe(
    data.map((datum) => dtoFromResponse(datum)),
    (datum) => `${datum.longitude}${datum.latitude}${datum.name}`
  );
};
