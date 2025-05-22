import { useMap } from "react-map-gl/mapbox";
import { useMapViewPageViewModel } from "../../../../app/routing/pages/MapViewPage/viewmodel";
import { useFrustumMeasurements } from "../../../../features/map-representation/hooks/useFrustumMeasurements.ts";
import { useEffect } from "react";
import { useMeasurementMapViewModel } from "../../../../features/map-representation/components/MeasurementsMap";

export const LoadMeasurementsOnMove = () => {
  const { current } = useMap();
  const { measurementsQuery } = useMapViewPageViewModel();
  const {
    state: { dataFlow },
  } = useMeasurementMapViewModel();

  const { requestMeasurementsByFrustum } = useFrustumMeasurements(
    { current: current || null },
    (ltc, rbc) => {
      measurementsQuery.mutate({
        type: dataFlow,
        ltc,
        rbc,
      });
    },
  );

  useEffect(() => {
    if (current) {
      current.on("moveend", () => {
        requestMeasurementsByFrustum();
      });
    }
  }, [current]);

  return <></>;
};
