import {
  objectOutputType,
  ZodAny,
  ZodArray,
  ZodObject,
  ZodRawShape,
  ZodType,
} from "zod";

import { ParameterError } from "./parameter-error";
import { ResponseError } from "./response-error";

export class ApiParser {
  private constructor() {}

  static parseParameters = <T extends ZodRawShape>(
    schema: ZodObject<T>,
    data: unknown
  ): objectOutputType<T, any> => {
    try {
      return schema.parse(data);
    } catch (e: unknown) {
      throw new ParameterError((e as Error).message);
    }
  };

  static parseResponse = <T>(
    schema: { parse: (arg0: unknown) => T },
    data: unknown
  ): T => {
    try {
      return schema.parse(data);
    } catch (e: unknown) {
      throw new ResponseError((e as Error).message);
    }
  };
}
