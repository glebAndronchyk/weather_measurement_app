import type { FC } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClientProvider } from "../query";
import { APPThemeProvider } from "../theme/APPThemeProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";

export const withCoreProviders = (Comp: FC<any>): FC<any> => {
  return (...props: any[]) => (
    <QueryClientProvider>
      <APPThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Comp {...props} />
        </LocalizationProvider>
      </APPThemeProvider>
    </QueryClientProvider>
  );
};
