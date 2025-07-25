import type { Coordinates } from "../../../shared/types/Coordinates";

export interface PostLocationDTO {
  type: string;
  metadata: string;
  point: Coordinates<string>;
}
