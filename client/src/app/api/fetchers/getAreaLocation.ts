import axios from "axios";
import type { BaseResponse } from "../types/BaseResponse.ts";
import type { MeasurementEntry } from "../types/MeasurementEntry.ts";
import type { MeasurementQueryPayloadSupertype } from "../types/MeasurementQueryPayloadSupertype.ts";

export const getAreaLocation = async (
  args: MeasurementQueryPayloadSupertype,
  additionalParams?: URLSearchParams,
) => {
  const params = new URLSearchParams(additionalParams || []);
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
