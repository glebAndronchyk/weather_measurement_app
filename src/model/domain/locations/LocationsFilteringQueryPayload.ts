import {SearchParams} from "../../controllers/SearchParams.js";
import {PaginationParams} from "../../controllers/PaginationParams.js";
import {SortingParams} from "../../controllers/SortingParams.js";
import {RectangularArea} from "../../controllers/RectangularArea.js";

export type LocationsFilteringQueryPayload =
    SearchParams &
    PaginationParams &
    SortingParams &
    RectangularArea;
