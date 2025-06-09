import { createContext } from "react";
import type { CONTEXT_MeasurementsMapViewModelSignature } from "./MeasurementsMapViewModel.types.ts";

export const MeasurementsMapViewModelContext =
  createContext<CONTEXT_MeasurementsMapViewModelSignature | null>(null);
