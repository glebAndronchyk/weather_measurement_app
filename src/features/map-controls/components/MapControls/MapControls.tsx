import { Stack } from "@mui/material";
import { rem } from "../../../../lib/css/rem.ts";
import { MeasurementFilters } from "../MeasurementFilters";

export const MapControls = () => {
  // todo: remove border
  return (
    <Stack borderLeft={"1px solid grey"} flex={0.25} padding={rem(16)}>
      <MeasurementFilters />
      {/*<LocationSearchForm />*/}
      {/*<MeasurementsTable />*/}
      {/*<MeasurementsCreator />*/}
    </Stack>
  );
};
