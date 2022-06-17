import { NextApiRequest, NextApiResponse } from "next";

import { ParameterError } from "./parameter-error";
import { ResponseError } from "./response-error";

export type RequestMethods =
  | "get"
  | "put"
  | "post"
  | "delete"
  | "head"
  | "connect"
  | "options"
  | "trace"
  | "patch";

export class ApiHandler {
  static handleEndpoint = <T>(
    handlers: Partial<{
      [key in RequestMethods]: (request: NextApiRequest) => T;
    }>
  ) => {
    return async (
      req: NextApiRequest,
      res: NextApiResponse<T | { error: string; details: any }>
    ) => {
      const method = (req.method?.toLowerCase() ?? "get") as RequestMethods;

      const handler = handlers[method];

      if (!handler)
        return res.status(405).end(`Method ${req.method} Not Allowed`);

      try {
        const response = await handler(req);
        return res.status(200).json(response);
      } catch (e: unknown) {
        const error = e as Error;

        if (error.name === ResponseError.name) {
          return res.status(500).json({
            error: ResponseError.name,
            details: JSON.parse(error.message),
          });
        } else if (error.name === ParameterError.name) {
          return res.status(400).json({
            error: ParameterError.name,
            details: JSON.parse(error.message),
          });
        } else {
          return res
            .status(500)
            .json({ error: error.name, details: error.message });
        }
      }
    };
  };
}
