import { MEASUREMENT_TYPE } from "../../../app/api/enums/MEASUREMENT_TYPE.ts";

export const MEASUREMENT_COLOR = {
  ["TEMPERATURE_MEASUREMENT"]: "#000000",
  ["WIND_MEASUREMENT"]: "#1113df",
} as Partial<Record<keyof typeof MEASUREMENT_TYPE, string>>;
