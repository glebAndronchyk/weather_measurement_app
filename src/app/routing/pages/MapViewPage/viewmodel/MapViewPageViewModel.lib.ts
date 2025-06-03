import type { QueryPayload } from "./MapViewPageViewModel.types.ts";

export class MeasurementLookupTypeTracker {
  static track(lookupType: QueryPayload["measurementsLookupType"]) {
    return {
      isAreaLookup: this._getIsAreaLookup(lookupType),
      isPaginatedLookup: this._getIsPaginatedLookup(lookupType),
    };
  }

  private static _getIsAreaLookup(
    lookupType: QueryPayload["measurementsLookupType"],
  ): lookupType is "area" {
    return lookupType === "area";
  }

  private static _getIsPaginatedLookup(
    lookupType: QueryPayload["measurementsLookupType"],
  ): lookupType is "pagination" {
    return lookupType === "pagination";
  }
}
