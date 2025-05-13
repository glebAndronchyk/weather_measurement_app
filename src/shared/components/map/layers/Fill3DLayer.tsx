import { Layer } from "react-map-gl/mapbox";
import { type FillExtrusionLayerSpecification } from "react-map-gl/mapbox-legacy";

interface Fill3DLayerProps
  extends Omit<FillExtrusionLayerSpecification, "type" | "paint" | "source"> {
  opacity: number;
}

export const Fill3DLayer = (props: Fill3DLayerProps) => {
  return (
    <Layer
      paint={{
        "fill-extrusion-height": ["get", "height"],
        "fill-extrusion-color": ["get", "color"],
        "fill-extrusion-opacity": props.opacity,
        "fill-extrusion-base": ["get", "base"],
      }}
      type="fill-extrusion"
      {...props}
    />
  );
};
