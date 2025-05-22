import { useMapViewPageViewModel } from "../../../../app/routing/pages/MapViewPage/viewmodel";
import { MeasurementSource } from "../MeasurementSource/MeasurementSource.tsx";
import { useMeasurementMapViewModel } from "../MeasurementsMap";

export const MeasurementsContent = () => {
  const { measurementsQuery } = useMapViewPageViewModel();
  const { measurementStyle } = useMeasurementMapViewModel();

  return (
    <>
      {measurementsQuery.data?.items.map((measurement) => (
        <MeasurementSource
          key={measurement.id}
          measurement={measurement}
          measurementStyle={measurementStyle}
        />
      ))}
    </>
  );
};
