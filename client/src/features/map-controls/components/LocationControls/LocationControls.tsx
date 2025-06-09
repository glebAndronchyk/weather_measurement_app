import { Stack } from "@mui/material";
import { SectionAccordion } from "../SectionAccordion";
import {
  CreateLocationModalTrigger,
  LocationMeasurementsControls,
} from "../../../locations";
import { LocationSearch } from "../../../locations/components/LocationSearch";
import { useMapControlsViewModel } from "../../viewmodel";
import { useMeasurementMapViewModel } from "../../../map-representation";
import { useLocationControlsState } from "./hooks/useLocationControlsState.ts";
import { km_to_m } from "../../../../lib/math/phys";

export const LocationControls = () => {
  const {
    state: { selectedLocation },
    updateViewModelState,
  } = useMapControlsViewModel();

  const {
    state: { dataFlow },
  } = useMeasurementMapViewModel();

  const { setLookupWithin, setLookupType, lookupWithin, lookupType } =
    useLocationControlsState({
      defaultMetersWithin: km_to_m(20),
    });

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
          onWithinChange={setLookupWithin}
          onLookupTypeChange={setLookupType}
          lookupWithin={lookupWithin}
          lookupType={lookupType}
          dataFlow={dataFlow}
          selectedLocation={selectedLocation}
        />
      </Stack>
    </SectionAccordion>
  );
};
