import { MapPolygonDraw } from "../../../../shared/components/map/MapPolygonDraw";
import { useMapViewPageViewModel } from "../../../../app/routing/pages/MapViewPage/viewmodel";

export const MeasurementDrawLayer = () => {
  const { mapMode, enterNormalMode } = useMapViewPageViewModel();

  if (mapMode === "normal") return null;

  const onUpdate = (e: { features: object[] }) => {
    enterNormalMode();
  };

  return (
    <MapPolygonDraw
      onCreate={onUpdate}
      displayControlsDefault={false}
      position="top-right"
      controls={{
        trash: true,
      }}
    />
  );
};
