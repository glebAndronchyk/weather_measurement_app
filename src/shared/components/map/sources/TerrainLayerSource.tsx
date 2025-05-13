import { Source } from "react-map-gl/mapbox";
import { type SourceSpecification } from "react-map-gl/mapbox-legacy";

type TerrainLayerSourceProps = Omit<
  SourceSpecification,
  "id" | "type" | "url"
> & {
  tileSize?: number;
};

const TERRAIN_SOURCE_ID = "terrain";

export const TerrainLayerSource = (props: TerrainLayerSourceProps) => {
  return (
    <Source
      id={TERRAIN_SOURCE_ID}
      type="raster-dem"
      url="mapbox://mapbox.mapbox-terrain-dem-v1"
      {...props}
    />
  );
};

TerrainLayerSource.id = TERRAIN_SOURCE_ID;
