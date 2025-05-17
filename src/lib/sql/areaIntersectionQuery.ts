type Point3D = [number | string, number | string, number | string]

export const areaIntersectionQuery = (ltc: Point3D, rbc: Point3D, areaQuery: string) => {
    return `
         (ST_3DIntersects(
                    ST_3DMakeBox(
                        ST_SetSRID(ST_MakePoint(${ltc[0]}, ${ltc[1]}, ${ltc[2]}), 4326),
                        ST_SetSRID(ST_MakePoint(${rbc[0]}, ${rbc[1]}, ${rbc[2]}), 4326)
                    ),
                    ${areaQuery}
         ))
    `
}
