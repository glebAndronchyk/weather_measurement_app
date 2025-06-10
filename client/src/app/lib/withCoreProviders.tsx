import type { FC, ReactNode } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClientProvider } from "../query";
import { APPThemeProvider } from "../theme/APPThemeProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";

export const withCoreProviders = (comp: FC): FC => {
  return (...props: never[]) => (
    <QueryClientProvider>
      <APPThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {comp(...props) as ReactNode}
        </LocalizationProvider>
      </APPThemeProvider>
    </QueryClientProvider>
  );
};
