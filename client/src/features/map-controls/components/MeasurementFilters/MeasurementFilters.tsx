import { GenericFilters } from "../../../../shared/components/GenericFilters";

import { useAvailableFilters } from "./hooks/useAvailableFilters.ts";
import { useMapViewPageBinding } from "./hooks/useMapViewPageBinding.ts";
import { SectionAccordion } from "../SectionAccordion";

export const MeasurementFilters = () => {
  const { filters } = useAvailableFilters();
  const { handleFilterChange } = useMapViewPageBinding();

  return (
    <SectionAccordion title="Filters">
      <GenericFilters filters={filters} onFilterChange={handleFilterChange} />
    </SectionAccordion>
  );
};
