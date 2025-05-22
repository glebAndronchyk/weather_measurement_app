import { type FC, memo } from "react";
import { Source } from "react-map-gl/mapbox";
import { FillLayer } from "../../../../shared/components/map/layers";
import { deepEqual } from "../../../../shared/lib/equality";
import type { MeasurementEntry } from "../../../../app/api/types/MeasurementEntry.ts";
import type { StyleFlow } from "../../lib/style-flow";

interface MeasurementSourceProps {
  measurement: MeasurementEntry;
  measurementStyle: StyleFlow;
}

export const MeasurementSource: FC<MeasurementSourceProps> = memo(
  (props) => {
    const { measurement, measurementStyle } = props;
    const { id, area } = measurement;

    return (
      <Source
        type={"geojson"}
        id={`geojson_source_${id}`}
        data={{
          type: "Feature",
          properties: measurementStyle(measurement),
          geometry: area as never,
        }}
      >
        <FillLayer id={`fill_${id}`} />
      </Source>
    );
  },
  (prevProps, nextProps) => {
    return !deepEqual(prevProps.measurement.area, nextProps.measurement.area);
  },
);
