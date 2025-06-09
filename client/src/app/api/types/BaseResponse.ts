export interface BaseResponse<TData = null, TError = null> {
  data: TData;
  error: TError;
}
