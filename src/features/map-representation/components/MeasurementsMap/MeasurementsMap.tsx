import { type FC } from "react";
import type { MeasurementsMapProps } from "./MeasurementsMap.types.ts";
import { Map } from "react-map-gl/mapbox";
import { MeasurementsContent } from "../MeasurementsContent";
import { DataLoader } from "../DataLoader";
import { useMapLoad } from "../../../../lib/react/hooks/map";
import { MeasurementDrawLayer } from "../MeasurementDrawLayer";

export const MeasurementsMap: FC<MeasurementsMapProps> = (props) => {
  const { mapState } = props;
  const { isLoaded, onLoad } = useMapLoad();

  return (
    <Map
      {...mapState}
      interactiveLayerIds={["fill"]}
      onLoad={onLoad}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
    >
      {isLoaded && (
        <>
          {/*<TerrainLayerSource tileSize={terrainTileSize} />*/}
          <DataLoader />
          <MeasurementsContent />
          <MeasurementDrawLayer />
        </>
      )}
    </Map>
  );
};
