import type { UNITS } from "../../../shared/constants/UNITS";
import { MEASUREMENT_TYPE } from "../enums/MEASUREMENT_TYPE.ts";

export interface CreateMeasurementRequestPayload {
  type: keyof typeof MEASUREMENT_TYPE;
  unit: UNITS;
  device_id: number;
  area: object;
  timestamp: string;
  genericMetrics: string;
}
