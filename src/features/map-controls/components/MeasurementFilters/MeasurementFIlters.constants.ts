import type { GenericFilterSignature } from "../../../../shared/components/GenericFilters";
import { UnitSelectorFilter } from "../../../map-representation/components/filters-atomics/UnitSelectorFilter";
import { DateRangeFilter } from "../../../map-representation/components/filters-atomics/DateRangeFilter";
import { CoordinatesFilter } from "../../../map-representation/components/filters-atomics/CoordinatesFilter";
import { PaginationModeSwitch } from "./components/PaginationModeSwitch";

export const defaultFilters: GenericFilterSignature[] = [
  {
    id: crypto.randomUUID(),
    label: "Paginated mode",
    component: PaginationModeSwitch,
  },
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

export const paginatedViewFilters: GenericFilterSignature[] = [
  {
    id: crypto.randomUUID(),
    label: "Within coordinate",
    component: CoordinatesFilter,
  },
];
