import { useMapViewPageViewModel } from "../../../../app/routing/pages/MapViewPage/viewmodel";
import { useMeasurementMapViewModel } from "../MeasurementsMap";
import { featureCollection, polygon } from "@turf/helpers";
import type { FeatureCollection } from "geojson";
import { Source } from "react-map-gl/mapbox";
import { FillLayer } from "../../../../shared/components/map/layers";
import { useMemo } from "react";

export const MeasurementsContent = () => {
  const {
    measurementsQuery,
    paginatedMeasurementsQuery,
    obtainQueryPayloadEntry,
  } = useMapViewPageViewModel();
  const { getMeasurementStyle } = useMeasurementMapViewModel();

  const measurementsLookupType = obtainQueryPayloadEntry(
    "measurementsLookupType",
  );

  const sourceMeasurements = useMemo(() => {
    return measurementsLookupType === "area"
      ? measurementsQuery
      : paginatedMeasurementsQuery;
  }, [paginatedMeasurementsQuery, measurementsQuery]);

  const source = (): FeatureCollection => {
    if (!measurementsQuery.data?.items) {
      return featureCollection([]);
    }

    const areas = sourceMeasurements.data?.items.map((entry) => {
      const area = polygon(
        entry.area.coordinates,
        getMeasurementStyle({ lookupType: measurementsLookupType })(entry),
      );
      return area;
    });

    return featureCollection(areas || []);
  };

  return (
    <>
      <Source type="geojson" data={source()}>
        <FillLayer id={`fill`} />
      </Source>
    </>
  );
};
