import { MapViewPageLayout } from "./MapViewPage.layout.tsx";
import { MeasurementsMap } from "../../../../features/map-representation/components/MeasurementsMap";
import { TerrainLayerSource } from "../../../../shared/components/map/sources/index.ts";

const MapViewPage = () => {
  return (
    <MapViewPageLayout>
      <MeasurementsMap
        measurementsList={[
          {
            measurement_type: "TEMPERATURE_MEASUREMENT",
            id: 6,
            device_id: 1,
            timestamp: "2023-01-01T00:00:00.000Z",
            area: {
              type: "Feature",
              properties: {
                height: 10,
                base: 0,
                color: "#ff0000",
                opacity: 0.25,
              },
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [0, 0, 0],
                    [0, 1, 0],
                    [1, 1, 0],
                    [1, 0, 0],
                    [0, 0, 0],
                  ],
                ],
              },
            },
          },
          {
            measurement_type: "TEMPERATURE_MEASUREMENT",
            id: 7,
            device_id: 1,
            timestamp: "2023-01-01T00:00:00.000Z",
            area: {
              type: "Feature",
              properties: {
                height: 10,
                base: 0,
                color: "#ff0000",
                opacity: 0.25,
              },
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [0, 0, 0],
                    [0, 1, 0],
                    [1, 1, 0],
                    [1, 0, 0],
                    [0, 0, 0],
                  ],
                ],
              },
            },
          },
          {
            measurement_type: "TEMPERATURE_MEASUREMENT",
            id: 8,
            device_id: 1,
            timestamp: "2023-02-02T00:00:00.000Z",
            area: {
              type: "Feature",
              properties: {
                height: 10,
                base: 0,
                color: "#ff0000",
                opacity: 0.25,
              },
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [0, 0, 0],
                    [0, 1, 0],
                    [1, 1, 0],
                    [1, 0, 0],
                    [0, 0, 0],
                  ],
                ],
              },
            },
          },
          {
            measurement_type: "TEMPERATURE_MEASUREMENT",
            id: 9,
            device_id: 1,
            timestamp: "2026-01-01T00:00:00.000Z",
            area: {
              type: "Feature",
              properties: {
                height: 200,
                base: 0,
                color: "#ff0000",
                opacity: 0.25,
              },
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [10, 10, 0],
                    [10, 20, 0],
                    [5, 20, 0],
                    [5, 10, 0],
                    [10, 10, 0],
                  ],
                ],
              },
            },
          },
        ]}
        terrainTileSize={1024}
        mapState={{
          initialViewState: {
            longitude: 10,
            latitude: 10,
            zoom: 12,
            pitch: 60,
          },
          terrain: {
            source: TerrainLayerSource.id,
            exaggeration: 30,
          },
          minZoom: 6,
          maxZoom: 14,
          mapStyle: "mapbox://styles/mapbox/satellite-v9",
          style: {
            width: "100vw",
            height: "100vh",
          },
        }}
      />
    </MapViewPageLayout>
  );
};

export default MapViewPage;
