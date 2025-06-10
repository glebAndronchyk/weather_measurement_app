import { z } from "zod";
import { MEASUREMENT_TYPE } from "../../../app/api/enums/MEASUREMENT_TYPE.ts";
import { decimalString, digitString } from "../../../lib/validation/zod";
import { UNITS } from "../../../shared/constants/UNITS.ts";

export const typeMetricsValidationSchema: Partial<
  Record<keyof typeof MEASUREMENT_TYPE, z.Schema>
> = {
  [MEASUREMENT_TYPE.TEMPERATURE_MEASUREMENT]: z.object({
    temperature: decimalString,
  }),
  [MEASUREMENT_TYPE.WIND_MEASUREMENT]: z.object({
    speed: z.number(),
  }),
} as const;

const measurementTypeValues = [...Object.values(MEASUREMENT_TYPE)] as [
  string,
  ...string[],
];
const unitValues = [...Object.values(UNITS)] as [string, ...string[]];

export const createMeasurementPayloadValidation = z
  .object({
    type: z.enum(measurementTypeValues),
    unit: z.enum(unitValues),
    device_id: digitString,
    timestamp: z.string(),
    genericMetrics: z.record(z.any(), z.any()),
  })
  .refine(
    (obj) => {
      const metricsSchema = typeMetricsValidationSchema[obj.type];

      if (!metricsSchema) return false;
      const metricParseResult = metricsSchema.safeParse(obj.genericMetrics);

      return metricParseResult.success;
    },
    {
      path: ["genericMetrics"],
    },
  );

export type CreateMeasurementFormSchema = z.infer<
  typeof createMeasurementPayloadValidation
>;
