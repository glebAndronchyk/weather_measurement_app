import { type FC } from "react";
import type { MeasurementsMapProps } from "./MeasurementsMap.types.ts";
import { TerrainLayerSource } from "../../../../shared/components/map/sources";
import { Map } from "react-map-gl/mapbox";
import { useMapLoad } from "../../../../lib/react/hooks/map";
import { LoadMeasurementsOnMove } from "../../../../shared/components/map/internals/LoadMeasurementsOnMove.tsx";
import { MeasurementsContent } from "../MeasurementsContent";

export const MeasurementsMap: FC<MeasurementsMapProps> = (props) => {
  const { mapState, terrainTileSize } = props;
  const { onLoad, isLoaded } = useMapLoad();

  return (
    <Map
      {...mapState}
      onLoad={onLoad}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
    >
      <TerrainLayerSource tileSize={terrainTileSize} />
      {isLoaded && (
        <>
          <LoadMeasurementsOnMove />
          <MeasurementsContent />
        </>
      )}
    </Map>
  );
};
