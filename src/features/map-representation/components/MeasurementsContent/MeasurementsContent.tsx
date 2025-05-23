import { useMapViewPageViewModel } from "../../../../app/routing/pages/MapViewPage/viewmodel";
import { useMeasurementMapViewModel } from "../MeasurementsMap";
import { featureCollection, polygon } from "@turf/helpers";
import type { FeatureCollection } from "geojson";
import { Source } from "react-map-gl/mapbox";
import { FillLayer } from "../../../../shared/components/map/layers";

export const MeasurementsContent = () => {
  const { measurementsQuery } = useMapViewPageViewModel();
  const { measurementStyle } = useMeasurementMapViewModel();

  const source = (): FeatureCollection => {
    if (!measurementsQuery.data?.items) {
      return featureCollection([]);
    }

    const areas = measurementsQuery.data?.items.map((entry) => {
      const area = polygon(entry.area.coordinates, measurementStyle(entry));
      return area;
    });

    return featureCollection(areas);
  };

  return (
    <>
      <Source type="geojson" data={source()}>
        <FillLayer id={`fill`} />
      </Source>
    </>
  );
};
