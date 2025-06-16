import { Stack } from "@mui/material";
import { rem } from "../../../../lib/css/rem.ts";
import { MeasurementFilters } from "../MeasurementFilters";
import { LocationControls } from "../LocationControls";
import { MeasurementsCreator } from "../MeasurementsCreator";

export const MapControls = () => {
  return (
    <Stack
      flex={0.25}
      gap={4}
      padding={rem(16)}
      maxWidth={770}
      minWidth={770}
      maxHeight="100vh"
      overflow="auto"
      bgcolor="grey.50"
    >
      <MeasurementFilters />
      <LocationControls />
      <MeasurementsCreator />
    </Stack>
  );
};
