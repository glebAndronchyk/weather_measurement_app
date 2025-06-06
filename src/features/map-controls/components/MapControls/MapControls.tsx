import { Stack } from "@mui/material";
import { rem } from "../../../../lib/css/rem.ts";
import { MeasurementFilters } from "../MeasurementFilters";
import { LocationForm } from "../../features/locations/components/LocationForm";

export const MapControls = () => {
  // todo: remove border
  return (
    <Stack borderLeft={"1px solid grey"} flex={0.25} padding={rem(16)}>
      <MeasurementFilters />
      <LocationForm />
      {/*<LocationSearchForm />*/}
      {/*<MeasurementsTable />*/}
      {/*<MeasurementsCreator />*/}
    </Stack>
  );
};
