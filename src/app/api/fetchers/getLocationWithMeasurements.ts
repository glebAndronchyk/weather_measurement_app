import axios from "axios";
import type { BaseResponse } from "../types/BaseResponse.ts";
import type { PaginatedResponse } from "../types/PaginatedResponse.ts";

export const getLocationWithMeasurements = async (
  id: number,
  take: number,
  skip: number,
  dataFlow: never,
) => {
  const response = await axios.get<BaseResponse<PaginatedResponse<never>>>(
    `/locations/${id}/measurements`,
    {
      params: new URLSearchParams({
        take: String(take),
        skip: String(skip),
        type: dataFlow as string,
      }),
    },
  );

  return response.data.data;
};
