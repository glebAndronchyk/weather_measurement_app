import MapboxDraw, { type MapboxDrawOptions } from "@mapbox/mapbox-gl-draw";
import { useControl } from "react-map-gl/mapbox";
import type { ControlPosition } from "react-map-gl/mapbox-legacy";

interface MapPolygonDraw extends Omit<MapboxDrawOptions, "defaultMode"> {
  controls?: Omit<MapboxDrawOptions["controls"], "polygon">;
  position: ControlPosition;

  onCreate?: (evt: { features: object[] }) => void;
  onUpdate?: (evt: { features: object[]; action: string }) => void;
  onDelete?: (evt: { features: object[] }) => void;
}

export const MapPolygonDraw = (props: MapPolygonDraw) => {
  useControl(
    () =>
      new MapboxDraw({
        ...props,
        defaultMode: "draw_polygon",
        controls: {
          ...props.controls,
          polygon: true,
        },
      }),
    ({ map }) => {
      map.on("draw.create", props.onCreate as never);
      map.on("draw.update", props.onUpdate as never);
      map.on("draw.delete", props.onDelete as never);
    },
    ({ map }) => {
      map.off("draw.create", props.onCreate as never);
      map.off("draw.update", props.onUpdate as never);
      map.off("draw.delete", props.onDelete as never);
    },
    {
      position: props.position,
    },
  );

  return null;
};
