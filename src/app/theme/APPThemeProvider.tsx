import { createTheme, ThemeProvider } from "@mui/material";
import type { PropsWithChildren } from "react";

const theme = createTheme();
export const APPThemeProvider = (props: PropsWithChildren) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};
