import { Stack } from "@mui/material";
import { rem } from "../../../../lib/css/rem.ts";
import { MeasurementFilters } from "../MeasurementFilters";
import { LocationControls } from "../LocationControls";

export const MapControls = () => {
  // todo: remove border
  return (
    <Stack
      borderLeft={"1px solid grey"}
      flex={0.25}
      gap={4}
      padding={rem(16)}
      maxWidth={770}
      minWidth={770}
    >
      <MeasurementFilters />
      <LocationControls />
      {/*<LocationSearchForm />*/}
      {/*<MeasurementsTable />*/}
      {/*<MeasurementsCreator />*/}
    </Stack>
  );
};
