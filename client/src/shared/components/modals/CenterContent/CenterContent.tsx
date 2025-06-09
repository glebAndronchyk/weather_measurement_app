import { alpha, Stack } from "@mui/material";
import type { PropsWithChildren } from "react";

export const CenterContent = (props: PropsWithChildren) => {
  return (
    <Stack
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: alpha("#fff", 0.2),
      }}
      alignItems="center"
      justifyContent="center"
    >
      {props.children}
    </Stack>
  );
};
