import { useState } from "react";
import type { MeasurementLookupType } from "../../../../../shared/types/MeasurementLookupType";

export const useLocationControlsState = (args: {
  defaultMetersWithin: number;
}) => {
  const { defaultMetersWithin } = args;

  const [lookupType, setLookupType] = useState<MeasurementLookupType>("all");
  const [lookupWithin, setLookupWithin] = useState(defaultMetersWithin);

  return {
    lookupType,
    lookupWithin,
    setLookupType,
    setLookupWithin,
  };
};
