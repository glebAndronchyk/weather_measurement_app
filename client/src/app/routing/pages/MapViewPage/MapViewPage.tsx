import {
  MeasurementsMap,
  MeasurementsMapViewModel,
} from "../../../../features/map-representation";
import { MapViewPageLayout } from "./MapViewPage.layout.tsx";
import { TerrainLayerSource } from "../../../../shared/components/map/sources";
import { MapViewPageViewModelProvider } from "./viewmodel";
import { DataFlowSelect } from "../../../../features/map-representation/components/DataFlowSelect";
import { MapControls } from "../../../../features/map-controls";
import { MapControlsViewModel } from "../../../../features/map-controls/viewmodel";

const MapViewPage = () => {
  return (
    <MapViewPageViewModelProvider>
      <MeasurementsMapViewModel>
        <MapViewPageLayout>
          <MeasurementsMap
            terrainTileSize={1024}
            mapState={{
              projection: "globe",
              initialViewState: {
                longitude: 39.659043,
                latitude: 48.065715,
                zoom: 12,
                pitch: 60,
              },
              terrain: {
                source: TerrainLayerSource.id,
                exaggeration: 30,
              },
              minZoom: 1,
              maxZoom: 24,
              mapStyle: "mapbox://styles/fenrisulven/cmb5gv7qq00lj01qx9l8d1r9q",
              style: {
                flex: 1,
                height: "100vh",
              },
            }}
          />
          <DataFlowSelect sx={{ position: "absolute" }} />
          <MapControlsViewModel>
            <MapControls />
          </MapControlsViewModel>
        </MapViewPageLayout>
      </MeasurementsMapViewModel>
    </MapViewPageViewModelProvider>
  );
};

export default MapViewPage;
