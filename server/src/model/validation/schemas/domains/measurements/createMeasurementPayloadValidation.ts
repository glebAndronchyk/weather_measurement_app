import {z} from "zod";
import {MEASUREMENT_TYPE, UNITS} from "../../../../../generated/prisma/enums.js";
import {typeMetricsValidationSchema} from "./typeMetricsValidationSchema.js";

export const createMeasurementPayloadValidation = z.object({
    type: z.enum(MEASUREMENT_TYPE),
    unit: z.enum(UNITS),
    device_id: z.number(),
    area: z.record(z.any(), z.any()).transform((val) => JSON.stringify(val.geometry)),
    timestamp: z.string(),
    genericMetrics: z.record(z.any(), z.any())
}).refine(
    (obj) => {
        const metricsSchema = typeMetricsValidationSchema[obj.type];

      if (!metricsSchema) return false;
      const metricParseResult = metricsSchema.safeParse(obj.genericMetrics);
      return metricParseResult.success;
    },
    {
        path: ['genericMetrics'],
    },
)

export const createManyMeasurementsPayloadValidation = z.object({
    items: z.array(createMeasurementPayloadValidation)
})