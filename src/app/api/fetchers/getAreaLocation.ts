import axios from "axios";
import type { FrustumMeasurementQueryPayload } from "../types/FrustumMeasurementQueryPayload.ts";
import type { BaseResponse } from "../types/BaseResponse.ts";
import type { MeasurementEntry } from "../types/MeasurementEntry.ts";

export const getAreaLocation = async (args: FrustumMeasurementQueryPayload) => {
  const params = new URLSearchParams();
  Object.entries(args).forEach(([key, val]) => {
    const mappedParamValue = Array.isArray(val) ? val.join(",") : val;
    params.append(key, mappedParamValue);
  });

  const response = await axios.get<
    BaseResponse<{
      items: MeasurementEntry[];
      totalItems: number;
    }>
  >("/measurements/area", {
    params,
  });

  return response.data.data;
};

export type AreaMeasurements = Awaited<ReturnType<typeof getAreaLocation>>;
