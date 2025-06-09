import {CreateMeasurementDBPayload} from "../../model/domain/measurements/CreateMeasurementPayload.js";

export const RAW_createSingleMeasurement = (obj: CreateMeasurementDBPayload, tableName: string) => {
    const genericFields = Object.entries(obj.genericMetrics);
    const keys = genericFields.map(entry => entry[0]);
    const values = genericFields.map(entry => entry[1]);

    return `
        INSERT INTO public."${tableName}"
        (unit, device_id, area, timestamp, ${keys.join(', ')})
        VALUES ('${obj.unit}', ${obj.device_id}, ST_GeomFromGeoJSON('${obj.area}'), '${obj.timestamp}', ${values.join(', ')})
    `
}
