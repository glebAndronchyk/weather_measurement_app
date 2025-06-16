import { useEffect } from "react";
import { useMapViewPageViewModel } from "../../../../../app/routing/pages/MapViewPage/viewmodel";
import { useMapControlsViewModel } from "../../../viewmodel";

export const useDrawerModeToggle = () => {
  const {
    state: { measurementsBuffer },
  } = useMapControlsViewModel();
  const { measurementsDrawLayerReference, mapEventBus } =
    useMapViewPageViewModel();

  useEffect(() => {
    if (measurementsDrawLayerReference.current) {
      if (measurementsBuffer.isSomethingCreating) {
        mapEventBus.dispatchEvent(new CustomEvent("glow-on"));
        measurementsDrawLayerReference.current!.changeMode("draw_polygon");
      } else {
        measurementsDrawLayerReference.current!.changeMode("static");
        mapEventBus.dispatchEvent(new CustomEvent("glow-off"));
      }
    }
  }, [
    measurementsBuffer.isSomethingCreating,
    measurementsDrawLayerReference.current,
  ]);
};
