import type { NextApiRequest, NextApiResponse } from "next";

import { ApiHandler } from "../../../../lib/api/api-handler";
import { handleGet } from "./handlers/handle-get";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await ApiHandler.handleEndpoint({ get: handleGet })(req, res);
}
