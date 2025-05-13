import { type MapProps } from "react-map-gl/mapbox";

export interface MeasurementsMapProps {
  measurementsList: [];
  terrainTileSize: number;
  mapState: {
    [K in keyof MapProps as K extends `on${string}` ? never : K]: MapProps[K];
  };
  /// methods to define polygons
}
