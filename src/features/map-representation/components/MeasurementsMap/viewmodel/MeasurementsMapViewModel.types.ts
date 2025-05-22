import type { EGeojsonMeasurementType } from "../../../../../shared/enums/EGeojsonMeasurementType.ts";
import type { DISPATCH_MeasurementsMapViewModelSignature } from "./MeasurementsMapViewModel.reducer.ts";
import type { StyleFlow } from "../../../lib/style-flow";

export interface CONTEXT_MeasurementsMapViewModelSignature {
  updateViewModelState: DISPATCH_MeasurementsMapViewModelSignature;
  state: STATE_MeasurementsMapViewModelSignature;
  measurementStyle: StyleFlow;
}

export interface STATE_MeasurementsMapViewModelSignature {
  dataFlow: EGeojsonMeasurementType;
}

export type DispatchAction =
  | { type: "setDataFlow"; payload: EGeojsonMeasurementType }
  | { type: "setDataFlow"; payload: EGeojsonMeasurementType };
