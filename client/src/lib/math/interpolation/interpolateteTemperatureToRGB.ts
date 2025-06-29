import { lerp } from "./lerp.ts";

export const interpolateTemperatureToRGB = (
  temp: number,
  min: number = -40,
  max: number = 100,
) => {
  const normalized = Math.max(0, Math.min(1, (temp - min) / (max - min)));
  let r, g, b;

  if (normalized < 0.5) {
    // cold
    const t = normalized * 2;
    r = Math.round(lerp(0, 5, t));
    g = Math.round(lerp(100, 255, t));
    b = Math.round(lerp(255, 100, t));
  } else {
    // hot
    const t = (normalized - 0.5) * 2;
    r = Math.round(lerp(100, 200, t));
    g = Math.round(lerp(255, 100, t));
    b = Math.round(lerp(0, 0, t));
  }

  return `rgb(${r}, ${g}, ${b})`;
};
