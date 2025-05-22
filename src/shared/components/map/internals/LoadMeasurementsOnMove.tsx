import { useMap } from "react-map-gl/mapbox";
import { useMapViewPageViewModel } from "../../../../app/routing/pages/MapViewPage/viewmodel";
import { useFrustumMeasurements } from "../../../../features/map-representation/hooks/useFrustumMeasurements.ts";
import { EGeojsonMeasurementType } from "../../../enums/EGeojsonMeasurementType.ts";
import { useEffect } from "react";

export const LoadMeasurementsOnMove = () => {
  const { current } = useMap();
  const { measurementsQuery } = useMapViewPageViewModel();
  const { requestMeasurementsByFrustum } = useFrustumMeasurements(
    { current: current || null },
    (ltc, rbc) => {
      measurementsQuery.mutate({
        type: EGeojsonMeasurementType.Measurement,
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
  }, []);

  return <></>;
};
