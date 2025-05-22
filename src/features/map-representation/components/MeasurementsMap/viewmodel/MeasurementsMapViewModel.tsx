import { MeasurementsMapViewModelContext } from "./MeasurementsMapViewModel.context.ts";
import { type FC, type PropsWithChildren, useMemo, useReducer } from "react";
import { EGeojsonMeasurementType } from "../../../../../shared/enums/EGeojsonMeasurementType.ts";
import { reducer } from "./MeasurementsMapViewModel.reducer.ts";
import {
  abstractMeasurementStyleFlow,
  temperatureMeasurementStyleFlow,
} from "../../../lib/style-flow";

export const MeasurementsMapViewModel: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, {
    dataFlow: EGeojsonMeasurementType.Temperature,
  });

  const measurementStyle = useMemo(() => {
    switch (state.dataFlow) {
      case "geojson_measurement":
        return temperatureMeasurementStyleFlow;
      default:
        return abstractMeasurementStyleFlow;
    }
  }, [state.dataFlow]);

  return (
    <MeasurementsMapViewModelContext.Provider
      value={{
        updateViewModelState: dispatch,
        state,
        measurementStyle,
      }}
    >
      {children}
    </MeasurementsMapViewModelContext.Provider>
  );
};
