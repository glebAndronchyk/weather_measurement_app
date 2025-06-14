import { useEffect } from "react";
import { useMapViewPageViewModel } from "../../../../../app/routing/pages/MapViewPage/viewmodel";
import { useMapControlsViewModel } from "../../../viewmodel";

export const useDrawerModeToggle = () => {
  const {
    state: { measurementsBuffer },
  } = useMapControlsViewModel();
  const { measurementsDrawLayerReference } = useMapViewPageViewModel();

  useEffect(() => {
    if (measurementsDrawLayerReference.current) {
      if (measurementsBuffer.isSomethingCreating) {
        measurementsDrawLayerReference.current!.changeMode("draw_polygon");
      } else {
        measurementsDrawLayerReference.current!.changeMode("static");
      }
    }
  }, [
    measurementsBuffer.isSomethingCreating,
    measurementsDrawLayerReference.current,
  ]);
};
