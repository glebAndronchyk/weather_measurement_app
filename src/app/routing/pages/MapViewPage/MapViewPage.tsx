import { MeasurementsMap } from "../../../../features/map-representation/components/MeasurementsMap/index.ts";
import { TerrainLayerSource } from "../../../../shared/components/map/sources/index.ts";
import { MapViewPageLayout } from "./MapViewPage.layout.tsx";
import { MapViewPageViewModelProvider } from "./viewmodel";

const MapViewPage = () => {
  return (
    <MapViewPageLayout>
      <MapViewPageViewModelProvider>
        <MeasurementsMap
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
            minZoom: 1,
            maxZoom: 20,
            mapStyle: "mapbox://styles/mapbox/satellite-v9",
            style: {
              width: "100vw",
              height: "100vh",
            },
          }}
        />
      </MapViewPageViewModelProvider>
    </MapViewPageLayout>
  );
};

export default MapViewPage;
