import { Layer } from "react-map-gl/mapbox";
import { type FillLayerSpecification } from "react-map-gl/mapbox-legacy";

type FillLayerProps = Omit<FillLayerSpecification, "type" | "source">;

export const FillLayer = (props: FillLayerProps) => {
  return (
    <Layer
      paint={{
        "fill-color": ["get", "color"],
        "fill-opacity": ["get", "opacity"],
      }}
      type="custom"
      {...props}
    />
  );
};
