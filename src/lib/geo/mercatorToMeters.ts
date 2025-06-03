import type { Coordinates } from "../../shared/types/Coordinates.ts";

export const mercatorToMeters = (coordinates: Coordinates<number>) => {
  const lng = coordinates[0];
  const lat = coordinates[1];
  const earthRadiusMeters = 6378137;

  const x = earthRadiusMeters * ((lng * Math.PI) / 180);
  const y =
    earthRadiusMeters * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));

  return [x, y];
};
