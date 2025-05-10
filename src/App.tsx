import Map from "react-map-gl/mapbox";

import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  console.log(import.meta.env);
  return (
    <>
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        mapStyle="mapbox://styles/mapbox/standard"
        style={{ width: 1200, height: 1200 }}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      ></Map>
    </>
  );
}

export default App;
