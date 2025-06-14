import type { DISPATCH_MeasurementsMapViewModelSignature } from "./MapControlsViewModel.reducer.ts";
import type { Location } from "../../../app/api/types/Location.ts";
import { MeasurementsBuffer } from "./lib/MeasurementsBuffer.ts";
import type { CreateMeasurementRequestPayloadWithTemporalId } from "../../../app/api/types/CreateMeasurementRequestPayload.ts";

export interface CONTEXT_MapControlsViewModelSignature {
  updateViewModelState: DISPATCH_MeasurementsMapViewModelSignature;
  state: STATE_MapControlsViewModelSignature;
}

export interface STATE_MapControlsViewModelSignature {
  filters: URLSearchParams;
  lookupType: "area" | "pagination";
  selectedLocation: Location | null;
  measurementsBuffer: MeasurementsBuffer;
}

export type DispatchAction =
  | {
      type: "setFilters";
      payload: URLSearchParams;
    }
  | {
      type: "setLookupType";
      payload: "area" | "pagination";
    }
  | {
      type: "setSelectedLocation";
      payload: Location | null;
    }
  | {
      type: "addNewMeasurement";
      payload: Partial<CreateMeasurementRequestPayloadWithTemporalId>;
    }
  | {
      type: "alignMeasurementPolygon";
      payload: object;
    }
  | {
      type: "clearMeasurementBuffer";
    };
