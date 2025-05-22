import { createContext } from "react";
import type { MapViewPageViewModelContextSignature } from "./MapViewPageViewModel.types.ts";

export const MapViewPageViewModelContext =
  createContext<MapViewPageViewModelContextSignature | null>(null);
