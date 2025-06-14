import { useCallback, useEffect } from "react";
import { DrawnEvent } from "../../../../../shared/lib/events/DrawnEvent.ts";
import { useMapViewPageViewModel } from "../../../../../app/routing/pages/MapViewPage/viewmodel";
import { useMapControlsViewModel } from "../../../viewmodel";

export const useAlignMeasurementPolygon = () => {
  const { mapEventBus } = useMapViewPageViewModel();
  const { updateViewModelState } = useMapControlsViewModel();

  const _mutableRemapCoordinates = (feature: {
    geometry: { coordinates: [[number[]]] };
  }) => {
    const coordinates = feature.geometry.coordinates.flat(1);
    coordinates.forEach((entry) => entry.push(0));

    return feature;
  };

  const _handler = useCallback((e: Event) => {
    const drawnEvent = e as DrawnEvent;
    updateViewModelState({
      type: "alignMeasurementPolygon",
      payload: _mutableRemapCoordinates(drawnEvent.detail.features[0] as never),
    });
  }, []);

  useEffect(() => {
    mapEventBus.addEventListener(DrawnEvent.key, _handler);
    return () => mapEventBus.removeEventListener(DrawnEvent.key, _handler);
  }, []);
};
