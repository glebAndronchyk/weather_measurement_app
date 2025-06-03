import type { DISPATCH_MeasurementsMapViewModelSignature } from "./MapControlsViewModel.reducer.ts";

export interface CONTEXT_MapControlsViewModelSignature {
  updateViewModelState: DISPATCH_MeasurementsMapViewModelSignature;
  state: STATE_MapControlsViewModelSignature;
}

export interface STATE_MapControlsViewModelSignature {
  filters: URLSearchParams;
  lookupType: "area" | "pagination";
}

export type DispatchAction =
  | {
      type: "setFilters";
      payload: URLSearchParams;
    }
  | {
      type: "setLookupType";
      payload: "area" | "pagination";
    };
