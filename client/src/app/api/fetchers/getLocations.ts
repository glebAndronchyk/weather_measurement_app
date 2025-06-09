import axios from "axios";
import type { BaseResponse } from "../types/BaseResponse.ts";
import type { Location } from "../types/Location.ts";

export const getLocations = async (searchQuery: string) => {
  const response = await axios.get<BaseResponse<Location[]>>("/locations", {
    params: new URLSearchParams({
      search: searchQuery,
      take: "200",
      skip: "0",
      field: "name",
    }),
  });

  return response.data.data;
};
