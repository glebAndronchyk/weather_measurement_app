import { useMeasurementMapViewModel } from "../MeasurementsMap";
import { EGeojsonMeasurementType } from "../../../../shared/enums/EGeojsonMeasurementType.ts";
import { Select } from "../../../../shared/components/Select";
import type { SelectValue } from "../../../../shared/components/Select/Select.tsx";
import type { SelectChangeEvent } from "@mui/material";

export const DataFlowSelect = () => {
  const { updateViewModelState, state } = useMeasurementMapViewModel();

  const items: SelectValue<string>[] = Object.values(
    EGeojsonMeasurementType,
  ).map((entry, index) => ({
    id: index,
    value: entry,
    label: entry,
  }));

  const handleChange = (
    _: SelectChangeEvent<SelectValue<string>>,
    value: string,
  ) => {
    updateViewModelState({
      type: "setDataFlow",
      payload: value as EGeojsonMeasurementType,
    });
  };

  return (
    <Select
      value={state.dataFlow}
      defaultValue={state.dataFlow}
      onChange={handleChange}
      items={items}
    />
  );
};
