import { createContext } from "react";
import type { CONTEXT_MapControlsViewModelSignature } from "./MapControlsViewModel.types.ts";

export const MapControlsViewModelContext =
  createContext<CONTEXT_MapControlsViewModelSignature | null>(null);
