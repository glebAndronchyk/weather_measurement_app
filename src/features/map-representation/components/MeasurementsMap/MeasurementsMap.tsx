import { type FC, useId } from "react";
import type { MeasurementsMapProps } from "./MeasurementsMap.types.ts";
import { useMapLoad } from "../../../../lib/react/hooks/map";
import { TerrainLayerSource } from "../../../../shared/components/map/sources";
import { Source, Map } from "react-map-gl/mapbox";
import {
  FillLayer,
  Fill3DLayer,
} from "../../../../shared/components/map/layers/index.ts";

export const MeasurementsMap: FC<MeasurementsMapProps> = (props) => {
  const { measurementsList, mapState, terrainTileSize } = props;
  const { onLoad, isLoaded } = useMapLoad();

  return (
    <Map
      {...mapState}
      onLoad={onLoad}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
    >
      <TerrainLayerSource tileSize={terrainTileSize} />
      {isLoaded &&
        measurementsList.map((measurement) => (
          <Source
            key={measurement.id}
            id={`measurement-${measurement.id}`}
            type={"geojson"}
            data={measurement.area}
          >
            <Fill3DLayer id={`${measurement.id}-3d-fill`} opacity={0.25} />
            <FillLayer id={`${measurement.id}-fill`} />
          </Source>
        ))}
    </Map>
  );
};
