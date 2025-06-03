import { MeasurementsMapViewModelContext } from "./MeasurementsMapViewModel.context.ts";
import { type FC, type PropsWithChildren, useReducer } from "react";
import { EGeojsonMeasurementType } from "../../../../../shared/enums/EGeojsonMeasurementType.ts";
import { reducer } from "./MeasurementsMapViewModel.reducer.ts";
import {
  abstractMeasurementStyleFlow,
  temperatureMeasurementStyleFlow,
} from "../../../lib/style-flow";
import { MeasurementLookupTypeTracker } from "../../../../../app/routing/pages/MapViewPage/viewmodel";

export const MeasurementsMapViewModel: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, {
    dataFlow: EGeojsonMeasurementType.Temperature,
  });

  const getMeasurementStyle = (args?: {
    lookupType?: "area" | "pagination";
  }) => {
    const { lookupType = "area" } = args || {};

    const { isAreaLookup } = MeasurementLookupTypeTracker.track(lookupType);

    switch (true) {
      case isAreaLookup && state.dataFlow === "geojson_temperaturemeasurement":
        return temperatureMeasurementStyleFlow;
      default:
        return abstractMeasurementStyleFlow;
    }
  };

  return (
    <MeasurementsMapViewModelContext.Provider
      value={{
        updateViewModelState: dispatch,
        state,
        getMeasurementStyle,
      }}
    >
      {children}
    </MeasurementsMapViewModelContext.Provider>
  );
};
