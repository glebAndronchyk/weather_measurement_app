export const UNITS = {
  CELCIUS: "CELCIUS",
  FAHRENHEIT: "FAHRENHEIT",
  MPS: "MPS",
} as const;

export type UNITS = (typeof UNITS)[keyof typeof UNITS];
