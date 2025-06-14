import type {
  STATE_MapControlsViewModelSignature,
  DispatchAction,
} from "./MapControlsViewModel.types.ts";
import type { useReducer } from "react";
import { MeasurementsBuffer } from "./lib/MeasurementsBuffer.ts";

export const reducer = (
  state: STATE_MapControlsViewModelSignature,
  action: DispatchAction,
) => {
  switch (action.type) {
    case "setFilters":
      return {
        ...state,
        filters: new URLSearchParams(),
      };
    case "setLookupType":
      return {
        ...state,
        lookupType: action.payload,
      };
    case "setSelectedLocation":
      return {
        ...state,
        selectedLocation: action.payload,
      };
    case "addNewMeasurement": {
      state.measurementsBuffer.addEntry(action.payload);
      return {
        ...state,
        measurementsBuffer: MeasurementsBuffer.clone(state.measurementsBuffer),
      };
    }
    case "alignMeasurementPolygon": {
      const lastEntryControls = state.measurementsBuffer.last;

      if (!lastEntryControls) return state;

      lastEntryControls.applyPolygon(action.payload);

      return {
        ...state,
        measurementsBuffer: MeasurementsBuffer.clone(state.measurementsBuffer),
      };
    }
    case "clearMeasurementBuffer": {
      state.measurementsBuffer.clear();

      return {
        ...state,
        measurementsBuffer: MeasurementsBuffer.clone(state.measurementsBuffer),
      };
    }
  }
};

export type USE_REDUCER_MapControlsViewModelSignature = ReturnType<
  typeof useReducer<STATE_MapControlsViewModelSignature, [DispatchAction]>
>;

export type DISPATCH_MeasurementsMapViewModelSignature =
  USE_REDUCER_MapControlsViewModelSignature[1];
