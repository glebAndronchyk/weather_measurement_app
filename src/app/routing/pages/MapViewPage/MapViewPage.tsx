import {
  MeasurementsMap,
  MeasurementsMapViewModel,
} from "../../../../features/map-representation";
import { MapViewPageLayout } from "./MapViewPage.layout.tsx";
import { TerrainLayerSource } from "../../../../shared/components/map/sources";
import { MapViewPageViewModelProvider } from "./viewmodel";
import { DataFlowSelect } from "../../../../features/map-representation/components/DataFlowSelect";

const MapViewPage = () => {
  return (
    <MapViewPageLayout>
      <MapViewPageViewModelProvider>
        <MeasurementsMapViewModel>
          <MeasurementsMap
            terrainTileSize={1024}
            mapState={{
              projection: "globe",
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
              mapStyle: "mapbox://styles/mapbox/satellite-v9?optimize=true",
              style: {
                position: "absolute",
                width: "100vw",
                height: "100vh",
              },
            }}
          />
          <DataFlowSelect />
        </MeasurementsMapViewModel>
      </MapViewPageViewModelProvider>
    </MapViewPageLayout>
  );
};

export default MapViewPage;
