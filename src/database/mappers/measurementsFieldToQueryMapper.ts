import {
    areaIntersectionQuery,
    deviceIdFilteringQuery,
    unitFilteringQuery,
    whereIncluded,
    WhereMapper
} from "../../lib/sql/index.js";
import {MeasurementQueryPayloadSupertype} from "../../model/domain/measurements/MeasurementQueryPayloadPaginated.js";
import {timestampFilteringQuery} from "../../lib/sql/timestampFilteringQuery.js";
import {dateRangeFilteringQuery} from "../../lib/sql/dateRangeFilteringQuery.js";

export const measurementsFieldToQueryMapper: WhereMapper<MeasurementQueryPayloadSupertype> = {
    units: (val, _, initialTableAlias) => unitFilteringQuery(initialTableAlias, val),
    device: (val) => deviceIdFilteringQuery(val),
    date: (val) => timestampFilteringQuery(val),
    dateStart: (val, obj) => dateRangeFilteringQuery(val, obj.dateEnd),
}
