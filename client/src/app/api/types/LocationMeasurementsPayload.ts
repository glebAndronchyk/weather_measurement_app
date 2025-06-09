import type { GeojsonTypeRequest } from "./GeojsonTypeRequest.ts";
import type { IdRequest } from "./IdRequest.ts";
import type { PaginatedRequest } from "./PaginatedRequest.ts";
import type { GeoPagination } from "./GeoPagination.ts";

export type LocationMeasurementsPayload = GeojsonTypeRequest &
  IdRequest &
  PaginatedRequest &
  GeoPagination;
