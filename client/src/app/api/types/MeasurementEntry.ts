import { MEASUREMENT_TYPE } from "../enums/MEASUREMENT_TYPE.ts";
import { UNITS } from "../../../shared/constants/UNITS.ts";

export interface MeasurementEntry {
  area: {
    type: string;
    coordinates: [[number[]]];
  };
  device_id: number;
  id: number;
  measurement_type: keyof typeof MEASUREMENT_TYPE;
  timestamp: string;
  unit: UNITS;
}
