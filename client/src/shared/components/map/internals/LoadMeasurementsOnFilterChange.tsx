import { useMapViewPageViewModel } from "../../../../app/routing/pages/MapViewPage/viewmodel";
import { useEffect } from "react";

export const LoadMeasurementsOnFilterChange = () => {
  const { obtainQueryPayloadEntry, setMeasurementsDynamicParams } =
    useMapViewPageViewModel();
  const measurementsFilters = obtainQueryPayloadEntry("measurementsFilter");

  useEffect(() => {
    setMeasurementsDynamicParams({ take: 200, skip: 0 });
  }, [measurementsFilters]);

  return <></>;
};
