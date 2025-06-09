import { useMapViewPageViewModel } from "../../../../app/routing/pages/MapViewPage/viewmodel";
import { useEffect } from "react";

export const LoadMeasurementsOnFilterChange = () => {
  const { obtainQueryPayloadEntry, paginatedMeasurementsQuery } =
    useMapViewPageViewModel();
  const measurementsFilters = obtainQueryPayloadEntry("measurementsFilter");

  useEffect(() => {
    paginatedMeasurementsQuery.mutate({ take: 200, skip: 0 });
  }, [measurementsFilters]);

  return <></>;
};
