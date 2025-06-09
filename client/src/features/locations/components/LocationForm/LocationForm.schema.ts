import { z } from "zod";
import { coordinatesTuple, jsonString } from "../../../../lib/validation/zod";

export const locationFormValidationSchema = z.object({
  locationCenter: coordinatesTuple,
  locationType: z.string(),
  locationMetadata: jsonString,
});

export type LocationFormValidationSchema = z.infer<
  typeof locationFormValidationSchema
>;
