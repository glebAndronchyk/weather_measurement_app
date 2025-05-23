import "mapbox-gl/dist/mapbox-gl.css";
import { APPRoutingModule } from "./app/routing/APPRoutingModule";
import { QueryClientProvider } from "./app/query";
import axios from "axios";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

// <Map
//     initialViewState={{
//         longitude: 0,
//         latitude: 0,
//         zoom: 12,
//         pitch: 60,
//     }}
//     onLoad={onLoad}
//     terrain={{
//         source: TerrainLayerSource.id,
//         exaggeration: 2,
//     }}
//     maxZoom={14}
//     projection="globe"
//     mapStyle="mapbox://styles/mapbox/satellite-v9"
//     style={{ width: "100vw", height: "100vh" }}
//     mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
// >
//     <TerrainLayerSource tileSize={1024} />
//     {isLoaded && (
//         <Source
//             id="polygon-source"
//             type={"geojson"}
//             data={{
//                 type: "FeatureCollection",
//                 features: [
//                     {
//                         type: "Feature",
//                         properties: {
//                             height: 10,
//                             base: 0,
//                             color: "#ff0000",
//                             opacity: 0.25,
//                         },
//                         geometry: {
//                             type: "Polygon",
//                             coordinates: [
//                                 [
//                                     [0, 0],
//                                     [100, 1],
//                                     [100, 100],
//                                 ],
//                             ],
//                         },
//                     },
//                     {
//                         type: "Feature",
//                         properties: {
//                             height: 10,
//                             base: 0,
//                             color: "#ff0000",
//                             opacity: 0.25,
//                         },
//                         geometry: {
//                             type: "Polygon",
//                             coordinates: [
//                                 [
//                                     [0, 0],
//                                     [-100, 1],
//                                     [-100, 100],
//                                 ],
//                             ],
//                         },
//                     },
//                 ],
//             }}
//         >
//             <Fill3DLayer id="3d-fill" opacity={0.25} />
//             <FillLayer id="fill" />
//         </Source>
//     )}
// </Map>

axios.defaults.baseURL = "http://localhost:8800";

function App() {
  return (
    <QueryClientProvider>
      <ThemeProvider theme={createTheme()}>
        <APPRoutingModule />
        <CssBaseline />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
