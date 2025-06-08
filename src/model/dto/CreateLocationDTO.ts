import {Coordinates} from "../tuples/Coordinates.js";

export interface CreateLocationDTO {
    type: string;
    metadata: object;
    point: Coordinates<string>;
}
