import {pagination, sorting, whereIncluded, areaIntersectionQuery} from "../../lib/sql/index.js";
import {
    LocationsFilteringQueryPayload
} from "../../model/domain/locations/LocationsFilteringQueryPayload.js";

const locationsQueryMapper: Parameters<typeof whereIncluded<LocationsFilteringQueryPayload>>[1] = {
    // todo: add lookup index
    search: (val) => `
                (
                    metadata->>'name' ilike '%${val}%' OR
                    metadata->>'description' ilike '%${val}%' OR
                    metadata->>'region' ilike '%${val}%' OR
                    metadata->>'country' ilike '%${val}%'
                )
            `,
    ltc: (val, { rbc }, initialTableAlias) =>
            areaIntersectionQuery(
                val,
                rbc,
                `(
                    SELECT point
                    from public."Location"
                    where id = ${initialTableAlias}.id
                )`
            ),
}

export const RAW_queryLocations = (obj: LocationsFilteringQueryPayload, initialTableAlias = 'location') => {
    const paginationQuery = pagination(obj);
    const whereQuery = whereIncluded(obj, locationsQueryMapper);
    const sortingQuery = sorting(obj.sort, [`metadata->>'${obj.field}'`]);

    return `
        SELECT *
        FROM public."geojson_location" ${initialTableAlias}
        ${whereQuery}
        ${sortingQuery}
        ${paginationQuery}
    `;
}