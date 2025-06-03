import {
  MeasurementLookupTypeTracker,
  useMapViewPageViewModel,
} from "../../../../../app/routing/pages/MapViewPage/viewmodel";
import { useMemo } from "react";
import {
  defaultFilters,
  paginatedViewFilters,
} from "../MeasurementFIlters.constants.ts";
import { useMeasurementMapViewModel } from "../../../../map-representation";

export const useAvailableFilters = () => {
  const {
    state: { dataFlow },
  } = useMeasurementMapViewModel();
  const { obtainQueryPayloadEntry } = useMapViewPageViewModel();

  const { isAreaLookup, isPaginatedLookup } =
    MeasurementLookupTypeTracker.track(
      obtainQueryPayloadEntry("measurementsLookupType"),
    );

  const _dataFlowFilters = useMemo(() => {
    switch (dataFlow) {
      default:
        return defaultFilters;
    }
  }, [dataFlow]);

  const _mixtureFilters = useMemo(() => {
    switch (true) {
      case isPaginatedLookup:
        return paginatedViewFilters;
      default:
        return defaultFilters;
    }
  }, [isAreaLookup, isPaginatedLookup]);

  const mergedFilters = useMemo(() => {
    const combinedFilters = [..._dataFlowFilters, ..._mixtureFilters];
    const uniqueFilters = new Set(combinedFilters);

    return Array.from(uniqueFilters);
  }, [_dataFlowFilters, _mixtureFilters]);

  return {
    filters: mergedFilters,
  };
};
