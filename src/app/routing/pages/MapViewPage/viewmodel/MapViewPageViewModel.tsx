import { MapViewPageViewModelContext } from "./MapViewPageViewModel.context.ts";
import { type FC, type PropsWithChildren, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getAreaLocation } from "../../../../api/fetchers/getAreaLocation.ts";
import type { FrustumMeasurementQueryPayload } from "../../../../api/types/FrustumMeasurementQueryPayload.ts";
import { getPaginatedLocation } from "../../../../api/fetchers/getPaginatedLocation.ts";
import type { MeasurementQueryPayloadSupertype } from "../../../../api/types/MeasurementQueryPayloadSupertype.ts";
import type {
  QueryPayload,
  QueryPayloadKeys,
} from "./MapViewPageViewModel.types.ts";

export const MapViewPageViewModelProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [_queriesPayload, _setQueriesPayload] = useState<QueryPayload>({
    measurementsFilter: new URLSearchParams(),
    measurementsLookupType: "area",
  });

  const measurementsQuery = useMutation({
    mutationKey: ["measurements"],
    mutationFn: (params: FrustumMeasurementQueryPayload) =>
      getAreaLocation(params, _queriesPayload.measurementsFilter),
  });

  const paginatedMeasurementsQuery = useMutation({
    mutationKey: ["paginatedMeasurements"],
    mutationFn: (params: MeasurementQueryPayloadSupertype) =>
      getPaginatedLocation(params, _queriesPayload.measurementsFilter),
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

  const obtainQueryPayloadEntry = <K extends QueryPayloadKeys>(
    key: K,
  ): QueryPayload[K] => {
    return _queriesPayload[key];
  };

  const bind = (key: QueryPayloadKeys, value: unknown) => {
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
        paginatedMeasurementsQuery,
        measurementsQuery,
        devicesQuery,
        locationsQuery,
        bind,
        obtainQueryPayloadEntry,
      }}
    >
      {children}
    </MapViewPageViewModelContext.Provider>
  );
};
