import {Coordinates} from "../tuples/Coordinates.js";

export interface RectangularArea {
    ltc: Coordinates<string | number>;
    rbc: Coordinates<string | number>;
}