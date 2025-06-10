import type { UseMutationResult } from "@tanstack/react-query";
import type { FrustumMeasurementQueryPayload } from "../../../../api/types/FrustumMeasurementQueryPayload.ts";
import type { AreaMeasurements } from "../../../../api/fetchers/getAreaLocation.ts";
import type { MeasurementQueryPayloadSupertype } from "../../../../api/types/MeasurementQueryPayloadSupertype.ts";
import type { PaginatedMeasurements } from "../../../../api/fetchers/getPaginatedLocation.ts";

export interface MapViewPageViewModelContextSignature {
  paginatedMeasurementsQuery: UseMutationResult<
    PaginatedMeasurements,
    any,
    MeasurementQueryPayloadSupertype
  >;
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

  mapMode: 'normal' | 'creator';
  enterCreatorMode(): void;
  enterNormalMode(): void;

  bind: (key: QueryPayloadKeys, value: unknown) => void;
  obtainQueryPayloadEntry: <K extends QueryPayloadKeys = QueryPayloadKeys>(
    key: K,
  ) => QueryPayload[K];
}

export interface QueryPayload {
  measurementsFilter: URLSearchParams;
  measurementsLookupType: "area" | "pagination";
}

export type QueryPayloadKeys = keyof QueryPayload;
