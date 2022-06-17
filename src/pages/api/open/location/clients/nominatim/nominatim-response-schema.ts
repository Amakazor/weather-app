import { z } from "zod";

export const nominatimItemSchema = z.object({
  place_id: z.number(),
  licence: z.string(),
  osm_type: z.string().optional(),
  osm_id: z.number().optional(),
  boundingbox: z
    .array(z.string().transform((string) => parseFloat(string)))
    .length(4),
  lat: z.string().transform((string) => parseFloat(string)),
  lon: z.string().transform((string) => parseFloat(string)),
  display_name: z.string(),
  place_rank: z.number(),
  category: z.string(),
  type: z.string(),
  importance: z.number(),
  icon: z.string().url().optional(),
});

export const nominatimResponseSchema = z.array(nominatimItemSchema);

export type NominatimResponseSchema = z.infer<typeof nominatimItemSchema>;
