import { MapViewPageViewModelContext } from "./MapViewPageViewModel.context.ts";
import type { FC, PropsWithChildren } from "react";
import { useMutation } from "@tanstack/react-query";
import { getAreaLocation } from "../../../../api/fetchers/getAreaLocation.ts";
import type { FrustumMeasurementQueryPayload } from "../../../../api/types/FrustumMeasurementQueryPayload.ts";

export const MapViewPageViewModelProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const measurementsQuery = useMutation({
    mutationKey: ["measurements"],
    mutationFn: (params: FrustumMeasurementQueryPayload) =>
      getAreaLocation(params),
  });

  const devicesQuery = useMutation({
    mutationKey: ["devices"],
    mutationFn: (params: FrustumMeasurementQueryPayload) =>
      getAreaLocation(params),
  });

  const locationsQuery = useMutation({
    mutationKey: ["locations"],
    mutationFn: (params: FrustumMeasurementQueryPayload) =>
      getAreaLocation(params),
  });

  return (
    <MapViewPageViewModelContext.Provider
      value={{
        measurementsQuery,
        devicesQuery,
        locationsQuery,
      }}
    >
      {children}
    </MapViewPageViewModelContext.Provider>
  );
};
