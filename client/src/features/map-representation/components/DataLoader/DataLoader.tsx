import {
  MeasurementLookupTypeTracker,
  useMapViewPageViewModel,
} from "../../../../app/routing/pages/MapViewPage/viewmodel";
import {
  LoadMeasurementsOnMove,
  LoadMeasurementsOnFilterChange,
} from "../../../../shared/components/map/internals";

export const DataLoader = () => {
  const { obtainQueryPayloadEntry } = useMapViewPageViewModel();

  const { isPaginatedLookup, isAreaLookup } =
    MeasurementLookupTypeTracker.track(
      obtainQueryPayloadEntry("measurementsLookupType"),
    );

  return (
    <>
      {isAreaLookup && <LoadMeasurementsOnMove />}
      {isPaginatedLookup && <LoadMeasurementsOnFilterChange />}
    </>
  );
};
