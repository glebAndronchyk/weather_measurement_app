import type { PostLocationDTO } from "../types/PostLocationDTO.ts";
import axios from "axios";
import type { BaseResponse } from "../types/BaseResponse.ts";

export const postLocation = async (data: PostLocationDTO) => {
  console.log(data);
  const response = await axios.post<BaseResponse<{ id: number }>>(
    "/locations",
    data,
  );

  return response.data.data;
};
