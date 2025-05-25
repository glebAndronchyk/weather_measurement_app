import type { GenericFilterSignature } from "../../../../shared/components/GenericFilters";
import { UnitSelectorFilter } from "../../../map-representation/components/filters-atomics/UnitSelectorFilter";

export const defaultFilters: GenericFilterSignature[] = [
  {
    id: crypto.randomUUID(),
    label: "Unit",
    component: UnitSelectorFilter,
  },
];
