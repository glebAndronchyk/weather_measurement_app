export const UNITS = {
  FAHRENHEIT: "FAHRENHEIT",
  MPS: "MPS",
  CELSIUS: "CELSIUS",
  KMH: "KMH",
  G_M3: "G_M3",
} as const;

export type UNITS = (typeof UNITS)[keyof typeof UNITS];
