import { MEASUREMENT_COLOR } from "../../constants/MEASUREMENT_COLOR.ts";
import { FtoC, interpolateTemperatureToRGB } from "../../../../lib/math";
import type { GeoJsonProperties } from "geojson";
import type { MeasurementEntry } from "../../../../app/api/types/MeasurementEntry.ts";

type MeasurementSourceStyle = GeoJsonProperties;

export type StyleFlow = (
  measurement: MeasurementEntry,
) => MeasurementSourceStyle;

export const abstractMeasurementStyleFlow: StyleFlow = (measurement) => {
  return {
    color: MEASUREMENT_COLOR[measurement.measurement_type],
    opacity: 0.25,
    height: 10,
  };
};

export const temperatureMeasurementStyleFlow: StyleFlow = (measurement) => {
  const temperatureMeasurement = measurement;
  // todo change field in view
  const celcius =
    temperatureMeasurement.unit === "CELCIUS"
      ? (temperatureMeasurement as unknown as { temp_c: number }).temp_c
      : FtoC((temperatureMeasurement as unknown as { temp_c: number }).temp_c);

  return {
    color: interpolateTemperatureToRGB(celcius),
    opacity: 0.5,
    height: 10,
  };
};
