import type { UseMutationResult } from "@tanstack/react-query";
import type { FrustumMeasurementQueryPayload } from "../../../../api/types/FrustumMeasurementQueryPayload.ts";
import type { AreaMeasurements } from "../../../../api/fetchers/getAreaLocation.ts";

export interface MapViewPageViewModelContextSignature {
  measurementsQuery: UseMutationResult<
    AreaMeasurements,
    any,
    FrustumMeasurementQueryPayload
  >;
  devicesQuery: UseMutationResult<
    AreaMeasurements,
    any,
    FrustumMeasurementQueryPayload
  >;
  locationsQuery: UseMutationResult<
    AreaMeasurements,
    any,
    FrustumMeasurementQueryPayload
  >;
}
