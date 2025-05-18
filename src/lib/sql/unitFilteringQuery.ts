import {UNITS} from "../../generated/prisma/index.js";

export const unitFilteringQuery = (tableAlias: string, units: UNITS[]) => {
    return `(${tableAlias}.unit in (${units.map(entry => `'${entry}'`).join()}))`
}
