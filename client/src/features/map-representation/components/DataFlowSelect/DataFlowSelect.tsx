import { useMeasurementMapViewModel } from "../MeasurementsMap";
import { EGeojsonMeasurementType } from "../../../../shared/enums/EGeojsonMeasurementType.ts";
import { Select } from "../../../../shared/components/Select";
import type {
  SelectProps,
  SelectValue,
} from "../../../../shared/components/Select/Select.tsx";
import type { SelectChangeEvent } from "@mui/material";
import type { FC } from "react";

type DataFlowSelectProps = Omit<
  SelectProps<EGeojsonMeasurementType>,
  "value" | "defaultValue" | "onChange" | "items"
>;

export const DataFlowSelect: FC<DataFlowSelectProps> = (props) => {
  const { sx, ...restProps } = props;
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
      {...restProps}
      variant="filled"
      value={state.dataFlow}
      defaultValue={state.dataFlow}
      onChange={handleChange}
      items={items}
      sx={{
        ...sx,
        bgcolor: "white",
      }}
    />
  );
};
