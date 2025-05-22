import { type RefObject, useCallback, useEffect, useMemo } from "react";
import { MercatorCoordinate } from "mapbox-gl";
import { type MapRef } from "react-map-gl/mapbox-legacy";
import { useMapViewPageViewModel } from "../../../app/routing/pages/MapViewPage/viewmodel";
import { debounce } from "../../../shared/lib/debounce";
import type { Coordinates } from "../../../shared/types/Coordinates.ts";

const convertCameraPositionToMercator = (
  position: MercatorCoordinate | null | undefined,
) => {
  if (!position) throw new Error("Camera position cannot be received.");

  const mercator = new MercatorCoordinate(position.x, position.y, position.z);
  const alt = mercator.toAltitude();
  const lngLat = mercator.toLngLat();

  return {
    x: lngLat.lng,
    y: lngLat.lat,
    z: alt,
  };
};

export const useFrustumMeasurements = (
  mapRef: RefObject<MapRef | null>,
  delegate: (ltc: Coordinates, rbc: Coordinates) => void,
) => {
  const { measurementsQuery } = useMapViewPageViewModel();

  const requestMeasurementsByFrustum = useCallback(
    debounce(() => {
      if (mapRef.current) {
        const cameraState = mapRef.current!.getFreeCameraOptions();
        const cameraPosition = convertCameraPositionToMercator(
          cameraState.position,
        );

        const canvas = mapRef.current.getCanvas();
        const { clientWidth, clientHeight } = canvas;

        const topLeft = mapRef.current.unproject([0, 0]);
        const bottomRight = mapRef.current.unproject([
          clientWidth,
          clientHeight,
        ]);

        const ltc: Coordinates = [topLeft.lng, topLeft.lat, cameraPosition.z];
        const rbc: Coordinates = [bottomRight.lng, bottomRight.lat, 0];

        delegate(ltc, rbc);
      }
    }),
    [measurementsQuery],
  );

  const controls = useMemo(
    () => ({
      requestMeasurementsByFrustum,
    }),
    [requestMeasurementsByFrustum],
  );

  useEffect(() => {
    requestMeasurementsByFrustum();
  }, []);

  return controls;
};
