import { useContext } from "react";
import { MapControlsViewModelContext } from "./MapControlsViewModel.context.ts";

export const useMapControlsViewModel = () => {
  const ctx = useContext(MapControlsViewModelContext);

  if (!ctx) throw new Error("useMapViewPageViewModel");

  return ctx;
};
