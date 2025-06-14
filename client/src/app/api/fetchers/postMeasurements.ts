import axios from "axios";
import type { BaseResponse } from "../types/BaseResponse.ts";
import type { CreateMeasurementRequestPayload } from "../types/CreateMeasurementRequestPayload.ts";

export const postMeasurements = async (
  data: CreateMeasurementRequestPayload[],
) => {
  const response = await axios.post<BaseResponse<never>>("/measurements/many", {
    items: data,
  });

  return response.data.data;
};
