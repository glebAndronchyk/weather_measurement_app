import { useContext } from "react";
import { MeasurementsMapViewModelContext } from "./MeasurementsMapViewModel.context.ts";

export const useMeasurementMapViewModel = () => {
  const ctx = useContext(MeasurementsMapViewModelContext);

  if (!ctx) throw new Error("useMapViewPageViewModel");

  return ctx;
};
