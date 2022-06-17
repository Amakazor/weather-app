import { z } from "zod";

export const getParametersSchema = z.object({ query: z.string() });

export type GetParameters = z.infer<typeof getParametersSchema>;
