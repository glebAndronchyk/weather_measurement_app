import type { FC, ReactNode } from "react";

export type GenericFilterComponent = FC<{
  onChange: (e: never, data: FilterChangePayload) => void;
  onMultiKeyChange: (e: never, data: FilterChangePayload[]) => void;
}>;

export interface FilterChangePayload {
  value: unknown;
  key: string;
}

export type FiltersObjectChangePayload = Record<
  string,
  FilterChangePayload["value"]
>;

export interface GenericFilterSignature {
  id: string;
  label: ReactNode;
  component: GenericFilterComponent;
}
