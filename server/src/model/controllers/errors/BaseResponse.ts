import {BaseResponseError} from "./BaseResponseError.ts";

export class BaseResponse<TData, TError = BaseResponseError> {
    private _data: TData;
    private _error: TError | null;

    constructor() {
        this._error = null;
        this._data = null;
    }

    toDTO() {
        return {
            data: this._data as TData,
            error: this._error as TError,
        }
    }

    setData(data: TData) {
        this._data = data;
        return this;
    }

    setError(error: TError) {
        this._error = error;
        return this;
    }
}
