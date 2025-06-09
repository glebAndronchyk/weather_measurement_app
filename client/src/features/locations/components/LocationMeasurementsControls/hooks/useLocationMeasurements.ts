import { useQuery } from "@tanstack/react-query";
import { getLocationWithMeasurements } from "../../../../../app/api/fetchers/getLocationWithMeasurements.ts";
import { getLatestLocationsMeasurements } from "../../../../../app/api/fetchers/getLatestLocationsMeasurements.ts";
import type { PaginatedResponse } from "../../../../../app/api/types/PaginatedResponse.ts";
import type { MeasurementLookupType } from "../../../../../shared/types/MeasurementLookupType.ts";
import type { Location } from "../../../../../app/api/types/Location.ts";
import type { LocationMeasurementsPayload } from "../../../../../app/api/types/LocationMeasurementsPayload.ts";
import type { EGeojsonMeasurementType } from "../../../../../shared/enums/EGeojsonMeasurementType.ts";

export const useLocationMeasurements = (payload: {
  selectedLocation: Location | null;
  take: number;
  skip: number;
  lookupWithin: number;
  dataFlow: string;
  lookupType: MeasurementLookupType;
}) => {
  const { skip, dataFlow, lookupWithin, take, selectedLocation, lookupType } =
    payload;

  const mapper = (data): PaginatedResponse<Location> => {
    if (!("totalItems" in data)) {
      const entries = Object.entries(data).filter((entry) => Boolean(entry[1]));

      return {
        totalItems: entries.length,
        items: entries.map((entry) => entry[1]) as Location[],
      };
    }

    return data;
  };

  const query = (): Promise<PaginatedResponse<Location>> => {
    const payload: LocationMeasurementsPayload = {
      type: dataFlow as EGeojsonMeasurementType,
      take,
      skip,
      id: Number(selectedLocation?.id) || -1,
      within: lookupWithin,
    };

    return lookupType === "all"
      ? getLocationWithMeasurements(payload)
      : getLatestLocationsMeasurements(payload);
  };

  const measurementsQuery = useQuery({
    queryKey: [
      "locationMeasurements",
      lookupType,
      selectedLocation,
      take,
      skip,
      dataFlow,
      lookupWithin,
    ],
    queryFn: query,
    select: mapper,
  });

  const hasData = Boolean(measurementsQuery?.data);

  return {
    measurementsQuery,
    hasData,
  };
};
