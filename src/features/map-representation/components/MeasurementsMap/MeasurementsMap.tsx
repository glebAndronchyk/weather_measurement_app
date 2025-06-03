import { type FC } from "react";
import type { MeasurementsMapProps } from "./MeasurementsMap.types.ts";
import { TerrainLayerSource } from "../../../../shared/components/map/sources";
import { Map } from "react-map-gl/mapbox";
import { MeasurementsContent } from "../MeasurementsContent";
import { DataLoader } from "../DataLoader";

export const MeasurementsMap: FC<MeasurementsMapProps> = (props) => {
  const { mapState, terrainTileSize } = props;

  return (
    <Map
      {...mapState}
      interactiveLayerIds={["fill"]}
      onClick={(e) => {
        console.log(e);
        console.log(e.features);
      }}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
    >
      <TerrainLayerSource tileSize={terrainTileSize} />
      <DataLoader />
      <MeasurementsContent />
    </Map>
  );
};
