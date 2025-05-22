import { useMapViewPageViewModel } from "../../../../app/routing/pages/MapViewPage/viewmodel";
import { MeasurementSource } from "../../../../shared/components/map/sources/MeasurementSource.tsx";

export const MeasurementsContent = () => {
  const { measurementsQuery } = useMapViewPageViewModel();

  return (
    <>
      {measurementsQuery.data?.items.map(({ area, id }) => (
        <MeasurementSource key={id} area={area} id={id} />
      ))}
    </>
  );
};
