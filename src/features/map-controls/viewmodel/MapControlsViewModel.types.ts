import type { DISPATCH_MeasurementsMapViewModelSignature } from "./MapControlsViewModel.reducer.ts";

export interface CONTEXT_MapControlsViewModelSignature {
  updateViewModelState: DISPATCH_MeasurementsMapViewModelSignature;
  state: STATE_MapControlsViewModelSignature;
}

export interface STATE_MapControlsViewModelSignature {
  filters: URLSearchParams;
}

export type DispatchAction = {
  type: "setFilters";
  payload: URLSearchParams;
};
