import axios from "axios";
import type { BaseResponse } from "../types/BaseResponse.ts";
import type { PaginatedResponse } from "../types/PaginatedResponse.ts";
import type { Location } from "../types/Location.ts";
import type { LocationMeasurementsPayload } from "../types/LocationMeasurementsPayload.ts";

export const getLocationWithMeasurements = async (
  args: LocationMeasurementsPayload,
) => {
  const response = await axios.get<BaseResponse<PaginatedResponse<Location>>>(
    `/locations/${args.id}/measurements`,
    {
      params: new URLSearchParams({
        take: String(args.take),
        skip: String(args.skip),
        type: args.type,
        within: String(args.within),
      }),
    },
  );

  return response.data.data;
};
