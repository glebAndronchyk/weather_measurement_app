import type {
  STATE_MapControlsViewModelSignature,
  DispatchAction,
} from "./MapControlsViewModel.types.ts";
import type { useReducer } from "react";

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
  }
};

export type USE_REDUCER_MapControlsViewModelSignature = ReturnType<
  typeof useReducer<STATE_MapControlsViewModelSignature, [DispatchAction]>
>;

export type DISPATCH_MeasurementsMapViewModelSignature =
  USE_REDUCER_MapControlsViewModelSignature[1];
