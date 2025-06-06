import { type FC } from "react";
import type { MeasurementsMapProps } from "./MeasurementsMap.types.ts";
import { TerrainLayerSource } from "../../../../shared/components/map/sources";
import { Map } from "react-map-gl/mapbox";
import { MeasurementsContent } from "../MeasurementsContent";
import { DataLoader } from "../DataLoader";
import { useMapLoad } from "../../../../lib/react/hooks/map";

export const MeasurementsMap: FC<MeasurementsMapProps> = (props) => {
  const { mapState, terrainTileSize } = props;
  const { isLoaded, onLoad } = useMapLoad();

  return (
    <Map
      {...mapState}
      interactiveLayerIds={["fill"]}
      onClick={(e) => {
        console.log(e);
        console.log(e.features);
      }}
      onLoad={onLoad}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
    >
      {isLoaded && (
        <>
          <TerrainLayerSource tileSize={terrainTileSize} />
          <DataLoader />
          <MeasurementsContent />
        </>
      )}
    </Map>
  );
};
