import {MEASUREMENT_TYPE} from "../../../../../generated/prisma/enums.js";
import {z} from "zod";

export const typeMetricsValidationSchema: Partial<Record<MEASUREMENT_TYPE, z.Schema>> = {
    [MEASUREMENT_TYPE.TEMPERATURE_MEASUREMENT]: z.object({
        temperature: z.number(),
    }),
    [MEASUREMENT_TYPE.WIND_MEASUREMENT]: z.object({
        speed: z.number(),
    }),
} as const
