import type { Coordinates } from "./Coordinates.ts";

export interface RectangularArea {
  ltc: Coordinates<string | number>;
  rbc: Coordinates<string | number>;
}
