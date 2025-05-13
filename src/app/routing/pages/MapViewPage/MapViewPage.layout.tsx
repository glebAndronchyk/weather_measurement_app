import { Stack } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

export const MapViewPageLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return <Stack flexDirection="row">{children}</Stack>;
};
