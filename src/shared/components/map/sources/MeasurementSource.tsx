import { type FC, memo } from "react";
import { Source } from "react-map-gl/mapbox";
import { FillLayer } from "../layers";
import { deepEqual } from "../../../lib/equality";

interface MeasurementSourceProps {
  area: object;
  id: number;
}

export const MeasurementSource: FC<MeasurementSourceProps> = memo(
  (props) => {
    const { id, area } = props;

    return (
      <Source
        type={"geojson"}
        id={`geojson_source_${id}`}
        data={{
          type: "Feature",
          properties: {
            height: 10,
            base: 0,
            color: "#ff0000",
            opacity: 0.25,
          },
          geometry: area as never,
        }}
      >
        <FillLayer id={`fill_${id}`} />
      </Source>
    );
  },
  (prevProps, nextProps) => {
    return !deepEqual(prevProps.area, nextProps.area);
  },
);
