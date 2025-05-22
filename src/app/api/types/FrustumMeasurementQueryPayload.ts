import type { MeasurementQueryPayloadSupertype } from "./MeasurementQueryPayloadSupertype.ts";
import type { RectangularArea } from "../../../shared/types/RectangularArea.ts";

export type FrustumMeasurementQueryPayload = Omit<
  MeasurementQueryPayloadSupertype,
  "lat" | "lon" | "extrusion" | "within" | "coordinates"
> &
  RectangularArea;
