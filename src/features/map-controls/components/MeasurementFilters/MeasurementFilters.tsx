import { GenericFilters } from "../../../../shared/components/GenericFilters";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAvailableFilters } from "./hooks/useAvailableFilters.ts";
import { useMapViewPageBinding } from "./hooks/useMapViewPageBinding.ts";

export const MeasurementFilters = () => {
  const { filters } = useAvailableFilters();
  const { handleFilterChange } = useMapViewPageBinding();

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        Filters
      </AccordionSummary>
      <AccordionDetails>
        <GenericFilters filters={filters} onFilterChange={handleFilterChange} />
      </AccordionDetails>
    </Accordion>
  );
};
