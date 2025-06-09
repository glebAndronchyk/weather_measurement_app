import {MEASUREMENT_TYPE} from "../../generated/prisma/enums.js";

export const measurementType_to_tableName = {
    [MEASUREMENT_TYPE.TEMPERATURE_MEASUREMENT]: 'TemperatureMeasurement',
    [MEASUREMENT_TYPE.WIND_MEASUREMENT]: 'WindMeasurement',
} satisfies Omit<Partial<Record<MEASUREMENT_TYPE, string>>, 'MEASUREMENT'>;
