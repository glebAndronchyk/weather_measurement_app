import type { GenericFilterSignature } from "../../../../shared/components/GenericFilters";
import { UnitSelectorFilter } from "../../../map-representation/components/filters-atomics/UnitSelectorFilter";
import { DateRangeFilter } from "../../../map-representation/components/filters-atomics/DateRangeFilter";

export const defaultFilters: GenericFilterSignature[] = [
  {
    id: crypto.randomUUID(),
    label: "Unit",
    component: UnitSelectorFilter,
  },
  {
    id: crypto.randomUUID(),
    label: "Date range",
    component: DateRangeFilter,
  },
];
