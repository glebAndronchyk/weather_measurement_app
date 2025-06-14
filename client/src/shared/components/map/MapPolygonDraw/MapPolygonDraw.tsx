import MapboxDraw, { type MapboxDrawOptions } from "@mapbox/mapbox-gl-draw";
import { useControl } from "react-map-gl/mapbox";
import type { ControlPosition } from "react-map-gl/mapbox-legacy";
import { type RefObject, useImperativeHandle, useMemo } from "react";
import type { DrawLayerControls } from "../../../../app/routing/pages/MapViewPage/viewmodel/MapViewPageViewModel.types.ts";
import StaticMode from "@mapbox/mapbox-gl-draw-static-mode";

MapboxDraw.modes.static = StaticMode;

interface MapPolygonDraw extends Omit<MapboxDrawOptions, "defaultMode"> {
  controls?: Omit<MapboxDrawOptions["controls"], "polygon">;
  position: ControlPosition;

  onCreate?: (evt: { features: object[] }) => void;
  onUpdate?: (evt: { features: object[]; action: string }) => void;
  onDelete?: (evt: { features: object[] }) => void;

  drawRef?: RefObject<DrawLayerControls | null>;
}

export const MapPolygonDraw = (props: MapPolygonDraw) => {
  const layer = useMemo(() => {
    return new MapboxDraw({
      ...props,
      modes: MapboxDraw.modes,
      defaultMode: "draw_polygon",
      controls: {
        ...props.controls,
        polygon: true,
      },
    });
  }, []);

  useControl(
    () => layer,
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

  useImperativeHandle(
    props.drawRef,
    () => ({
      deleteAll() {
        layer.deleteAll();
      },
      changeMode(mode: string, options?: object) {
        console.log(layer);
        layer.changeMode(mode, options);
      },
      getAll() {
        return layer.getAll();
      },
    }),
    [layer],
  );

  return null;
};
