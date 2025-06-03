import type { MeasurementQueryPayloadSupertype } from "../types/MeasurementQueryPayloadSupertype.ts";
import axios from "axios";
import type { BaseResponse } from "../types/BaseResponse.ts";
import type { MeasurementEntry } from "../types/MeasurementEntry.ts";

export const getPaginatedLocation = async (
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
  >("/measurements", {
    params,
  });

  return response.data.data;
};

export type PaginatedMeasurements = Awaited<
  ReturnType<typeof getPaginatedLocation>
>;
