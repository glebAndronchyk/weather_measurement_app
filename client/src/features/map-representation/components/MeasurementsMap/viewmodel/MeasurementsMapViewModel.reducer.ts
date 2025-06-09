import type {
  DispatchAction,
  STATE_MeasurementsMapViewModelSignature,
} from "./MeasurementsMapViewModel.types.ts";
import type { useReducer } from "react";

export const reducer = (
  state: STATE_MeasurementsMapViewModelSignature,
  action: DispatchAction,
) => {
  switch (action.type) {
    case "setDataFlow":
      return {
        ...state,
        dataFlow: action.payload,
      };
  }
};

export type USE_REDUCER_MeasurementsMapViewModelSignature = ReturnType<
  typeof useReducer<STATE_MeasurementsMapViewModelSignature, [DispatchAction]>
>;

export type DISPATCH_MeasurementsMapViewModelSignature =
  USE_REDUCER_MeasurementsMapViewModelSignature[1];
