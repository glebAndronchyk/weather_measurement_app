import { MapPolygonDraw } from "../../../../shared/components/map/MapPolygonDraw";
import { useMapViewPageViewModel } from "../../../../app/routing/pages/MapViewPage/viewmodel";
import { DrawnEvent } from "../../../../shared/lib/events/DrawnEvent.ts";

export const MeasurementDrawLayer = () => {
  const { measurementsDrawLayerReference, mapEventBus } =
    useMapViewPageViewModel();

  const handleSomethingDrawn = (e: { features: object[] }) => {
    mapEventBus.dispatchEvent(new DrawnEvent(e));
  };

  return (
    <MapPolygonDraw
      drawRef={measurementsDrawLayerReference}
      onCreate={handleSomethingDrawn}
      displayControlsDefault={false}
      position="top-right"
      controls={{
        trash: true,
      }}
    />
  );
};
