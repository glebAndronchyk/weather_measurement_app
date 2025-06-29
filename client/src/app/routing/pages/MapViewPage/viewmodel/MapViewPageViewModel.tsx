import { MapViewPageViewModelContext } from "./MapViewPageViewModel.context.ts";
import {
  type FC,
  type PropsWithChildren,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAreaLocation } from "../../../../api/fetchers/getAreaLocation.ts";
import type { FrustumMeasurementQueryPayload } from "../../../../api/types/FrustumMeasurementQueryPayload.ts";
import { getPaginatedLocation } from "../../../../api/fetchers/getPaginatedLocation.ts";
import type { MeasurementQueryPayloadSupertype } from "../../../../api/types/MeasurementQueryPayloadSupertype.ts";
import type {
  DrawLayerControls,
  QueryPayload,
  QueryPayloadKeys,
} from "./MapViewPageViewModel.types.ts";

export const MapViewPageViewModelProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [_queriesPayload, _setQueriesPayload] = useState<QueryPayload>({
    measurementsFilter: new URLSearchParams(),
    measurementsLookupType: "area",
  });

  const [measurementsDynamicParams, setMeasurementsDynamicParams] =
    useState<MeasurementQueryPayloadSupertype>();

  const measurementsDrawLayerReference = useRef<DrawLayerControls | null>(null);
  const mapEventBus = useMemo(() => new EventTarget(), []);

  const measurementsQuery = useQuery({
    queryKey: ["measurements", measurementsDynamicParams],
    queryFn: () =>
      measurementsDynamicParams &&
      getAreaLocation(
        measurementsDynamicParams,
        _queriesPayload.measurementsFilter,
      ),
    enabled: _queriesPayload.measurementsLookupType === "area",
  });

  const paginatedMeasurementsQuery = useQuery({
    queryKey: ["paginatedMeasurements", measurementsDynamicParams],
    queryFn: () =>
      measurementsDynamicParams &&
      getPaginatedLocation(
        measurementsDynamicParams,
        _queriesPayload.measurementsFilter,
      ),
    enabled: _queriesPayload.measurementsLookupType === "pagination",
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
        setMeasurementsDynamicParams,
        measurementsDrawLayerReference,
        paginatedMeasurementsQuery,
        measurementsQuery,
        devicesQuery,
        locationsQuery,
        bind,
        obtainQueryPayloadEntry,
        mapEventBus,
      }}
    >
      {children}
    </MapViewPageViewModelContext.Provider>
  );
};
