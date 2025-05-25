import { useMeasurementMapViewModel } from "../../../map-representation";
import { useMapViewPageViewModel } from "../../../../app/routing/pages/MapViewPage/viewmodel";
import { useMapControlsViewModel } from "../../viewmodel";
import { useMemo } from "react";
import type { FiltersObjectChangePayload } from "../../../../shared/components/GenericFilters/GenericFilters.types.ts";
import { GenericFilters } from "../../../../shared/components/GenericFilters";
import { defaultFilters } from "./MeasurementFIlters.constants.ts";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const MeasurementFilters = () => {
  const {
    state: { dataFlow },
  } = useMeasurementMapViewModel();
  const { bind } = useMapViewPageViewModel();
  const {
    // state: { filters },
    updateViewModelState: updateMapControlsState,
  } = useMapControlsViewModel();

  const renderFilters = useMemo(() => {
    switch (dataFlow) {
      default:
        return defaultFilters;
    }
  }, [dataFlow]);

  const handleFilterChange = (_: never, value: FiltersObjectChangePayload) => {
    const sp = new URLSearchParams(value as Record<string, string>);

    bind("measurementsFilter", sp);
    updateMapControlsState({
      type: "setFilters",
      payload: sp,
    });
  };

  // todo
  // useEffect(() => {
  //   bind("measurementsFilter", filters);
  // }, []);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        Filters
      </AccordionSummary>
      <AccordionDetails>
        <GenericFilters
          filters={renderFilters}
          onFilterChange={handleFilterChange}
        />
      </AccordionDetails>
    </Accordion>
  );
};
