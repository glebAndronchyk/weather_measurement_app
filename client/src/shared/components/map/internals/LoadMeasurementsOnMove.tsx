import { useMap } from "react-map-gl/mapbox";
import { useMapViewPageViewModel } from "../../../../app/routing/pages/MapViewPage/viewmodel";
import { useFrustumMeasurements } from "../../../../features/map-representation/hooks/useFrustumMeasurements.ts";
import { useEffect } from "react";
import { useMeasurementMapViewModel } from "../../../../features/map-representation/components/MeasurementsMap";

export const LoadMeasurementsOnMove = () => {
  const { current } = useMap();
  const { setMeasurementsDynamicParams, obtainQueryPayloadEntry } =
    useMapViewPageViewModel();
  const {
    state: { dataFlow },
  } = useMeasurementMapViewModel();

  const measurementsFilters = obtainQueryPayloadEntry("measurementsFilter");

  const { requestMeasurementsByFrustum } = useFrustumMeasurements(
    {
      current: current || null,
    },
    (ltc, rbc) => {
      setMeasurementsDynamicParams({
        type: dataFlow,
        ltc,
        rbc,
      });
    },
  );

  useEffect(() => {
    requestMeasurementsByFrustum();
  }, [dataFlow, measurementsFilters]);

  useEffect(() => {
    if (current) {
      current.on("moveend", requestMeasurementsByFrustum);

      return () => {
        current.off("moveend", requestMeasurementsByFrustum);
      };
    }
  }, [current, requestMeasurementsByFrustum]);

  return <></>;
};
