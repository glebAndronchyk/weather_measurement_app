import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import type { FrustumMeasurementQueryPayload } from "../../../../api/types/FrustumMeasurementQueryPayload.ts";
import type { AreaMeasurements } from "../../../../api/fetchers/getAreaLocation.ts";
import type { PaginatedMeasurements } from "../../../../api/fetchers/getPaginatedLocation.ts";
import type { RefObject } from "react";
import type { MeasurementQueryPayloadSupertype } from "../../../../api/types/MeasurementQueryPayloadSupertype.ts";

export interface MapViewPageViewModelContextSignature {
  paginatedMeasurementsQuery: UseQueryResult<
    PaginatedMeasurements | undefined,
    any
  >;
  measurementsQuery: UseQueryResult<AreaMeasurements | undefined, any>;
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

  setMeasurementsDynamicParams: (
    payload: MeasurementQueryPayloadSupertype,
  ) => void;
  measurementsDrawLayerReference: RefObject<DrawLayerControls | null>;
  mapEventBus: EventTarget;

  bind: (key: QueryPayloadKeys, value: unknown) => void;
  obtainQueryPayloadEntry: <K extends QueryPayloadKeys = QueryPayloadKeys>(
    key: K,
  ) => QueryPayload[K];
}

export interface DrawLayerControls {
  deleteAll: () => void;
  changeMode: (mode: string, options?: object) => void;
  getAll: () => object;
}

export interface QueryPayload {
  measurementsFilter: URLSearchParams;
  measurementsLookupType: "area" | "pagination";
}

export type QueryPayloadKeys = keyof QueryPayload;
