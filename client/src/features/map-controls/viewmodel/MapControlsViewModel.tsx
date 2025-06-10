import { MapControlsViewModelContext } from "./MapControlsViewModel.context.ts";
import { type FC, type PropsWithChildren, useReducer } from "react";
import { reducer } from "./MapControlsViewModel.reducer.ts";
import { MeasurementsBuffer } from "./lib/MeasurementsBuffer.ts";

export const MapControlsViewModel: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, {
    filters: new URLSearchParams(),
    lookupType: "area",
    selectedLocation: null as never,
    measurementsBuffer: MeasurementsBuffer.instantiate(),
  });

  return (
    <MapControlsViewModelContext.Provider
      value={{
        updateViewModelState: dispatch,
        state,
      }}
    >
      {children}
    </MapControlsViewModelContext.Provider>
  );
};
