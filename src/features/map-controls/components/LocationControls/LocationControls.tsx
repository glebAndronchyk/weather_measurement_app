import { Stack } from "@mui/material";
import { SectionAccordion } from "../SectionAccordion";
import {
  CreateLocationModalTrigger,
  LocationMeasurementsControls,
} from "../../../locations";
import { LocationSearch } from "../../../locations/components/LocationSearch";
import { useMapControlsViewModel } from "../../viewmodel";
import { useMeasurementMapViewModel } from "../../../map-representation";

export const LocationControls = () => {
  const {
    state: { selectedLocation },
    updateViewModelState,
  } = useMapControlsViewModel();

  const {
    state: { dataFlow },
  } = useMeasurementMapViewModel();

  return (
    <SectionAccordion title="Location controls">
      <Stack gap={2}>
        <CreateLocationModalTrigger />
        <LocationSearch
          onChange={(value) =>
            updateViewModelState({
              type: "setSelectedLocation",
              payload: value,
            })
          }
        />
        <LocationMeasurementsControls
          dataFlow={dataFlow}
          selectedLocation={selectedLocation}
        />
      </Stack>
    </SectionAccordion>
  );
};
