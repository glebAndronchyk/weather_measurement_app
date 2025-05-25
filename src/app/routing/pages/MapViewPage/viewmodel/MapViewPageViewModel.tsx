import { MapViewPageViewModelContext } from "./MapViewPageViewModel.context.ts";
import { type FC, type PropsWithChildren, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getAreaLocation } from "../../../../api/fetchers/getAreaLocation.ts";
import type { FrustumMeasurementQueryPayload } from "../../../../api/types/FrustumMeasurementQueryPayload.ts";

export const MapViewPageViewModelProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [_queriesPayload, _setQueriesPayload] = useState({
    measurementsFilter: new URLSearchParams(),
  });

  const measurementsQuery = useMutation({
    mutationKey: ["measurements"],
    mutationFn: (params: FrustumMeasurementQueryPayload) =>
      getAreaLocation(params, _queriesPayload.measurementsFilter),
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

  const bind = (key: string, value: unknown) => {
    if (!(key in _queriesPayload)) {
      console.warn("map view page vm doesnt contain such bindable key");
      return;
    }

    if (_queriesPayload[key] === value) {
      return;
    }

    _setQueriesPayload((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <MapViewPageViewModelContext.Provider
      value={{
        measurementsQuery,
        devicesQuery,
        locationsQuery,
        bind,
      }}
    >
      {children}
    </MapViewPageViewModelContext.Provider>
  );
};
