import { z } from "zod";

export const getParametersSchema = z.object({
  longitude: z.string().transform((x) => parseFloat(x)),
  latitude: z.string().transform((x) => parseFloat(x)),
});

export type GetParameters = z.infer<typeof getParametersSchema>;
