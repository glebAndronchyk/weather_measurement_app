import { MapPolygonDraw } from "../../../../shared/components/map/MapPolygonDraw";

export const MeasurementDrawLayer = () => {
  const onUpdate = (e: { features: object[] }) => {
    console.log(e);
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
