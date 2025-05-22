import { useContext } from "react";
import { MapViewPageViewModelContext } from "./MapViewPageViewModel.context.ts";

export const useMapViewPageViewModel = () => {
  const ctx = useContext(MapViewPageViewModelContext);

  if (!ctx) throw new Error("useMapViewPageViewModel");

  return ctx;
};
