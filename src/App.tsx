import "mapbox-gl/dist/mapbox-gl.css";
import { APPRoutingModule } from "./app/routing/APPRoutingModule";
import { QueryClientProvider } from "./app/query";
import axios from "axios";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

axios.defaults.baseURL = "http://localhost:8800";

function App() {
  return (
    <QueryClientProvider>
      <ThemeProvider theme={createTheme()}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <APPRoutingModule />
          <CssBaseline />
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
