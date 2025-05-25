import "mapbox-gl/dist/mapbox-gl.css";
import { APPRoutingModule } from "./app/routing/APPRoutingModule";
import { QueryClientProvider } from "./app/query";
import axios from "axios";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

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
