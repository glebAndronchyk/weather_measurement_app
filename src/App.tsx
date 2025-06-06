import "mapbox-gl/dist/mapbox-gl.css";
import { APPRoutingModule } from "./app/routing/APPRoutingModule";
import axios from "axios";
import { CssBaseline } from "@mui/material";
import { withCoreProviders } from "./app/lib/withCoreProviders.tsx";

axios.defaults.baseURL = "http://localhost:8800";

function App() {
  return (
    <>
      <APPRoutingModule />
      <CssBaseline />
    </>
  );
}

export default withCoreProviders(App);
