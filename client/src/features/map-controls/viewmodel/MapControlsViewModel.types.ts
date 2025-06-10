import type { DISPATCH_MeasurementsMapViewModelSignature } from "./MapControlsViewModel.reducer.ts";
import type { Location } from "../../../app/api/types/Location.ts";
import { MeasurementsBuffer } from "./lib/MeasurementsBuffer.ts";

export interface CONTEXT_MapControlsViewModelSignature {
  updateViewModelState: DISPATCH_MeasurementsMapViewModelSignature;
  state: STATE_MapControlsViewModelSignature;
}

export interface STATE_MapControlsViewModelSignature {
  filters: URLSearchParams;
  lookupType: "area" | "pagination";
  selectedLocation: Location | null;
  measurementsBuffer: MeasurementsBuffer;
}

export type DispatchAction =
  | {
      type: "setFilters";
      payload: URLSearchParams;
    }
  | {
      type: "setLookupType";
      payload: "area" | "pagination";
    }
  | {
      type: "setSelectedLocation";
      payload: Location | null;
    }
  | {
      type: "addNewMeasurement";
      payload: never;
    }
  | {
      type: "alignMeasurementPolygon";
      payload: object;
    };
