export const lerp = (x: number, y: number, factor: number) =>
  x * (1 - factor) + y * factor;
