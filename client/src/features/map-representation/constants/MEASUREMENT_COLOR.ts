import { MEASUREMENT_TYPE } from "../../../app/api/enums/MEASUREMENT_TYPE.ts";

export const MEASUREMENT_COLOR = {
  ["TEMPERATURE_MEASUREMENT"]: "#ff8080",
  ["WIND_MEASUREMENT"]: "#80e1ff",
} as Partial<Record<keyof typeof MEASUREMENT_TYPE, string>>;
