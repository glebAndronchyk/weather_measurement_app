import type { GenericFilterComponent } from "../../../../../shared/components/GenericFilters";
import { useState } from "react";
import type { SelectChangeEvent } from "@mui/material";
import {
  Select,
  type SelectValue,
} from "../../../../../shared/components/Select/Select.tsx";
import { UNITS } from "../../../../../shared/constants/UNITS.ts";

export const UnitSelectorFilter: GenericFilterComponent = (props) => {
  const { onChange } = props;
  const [controlledValue, setControlledValue] = useState<string>(UNITS.CELSIUS);

  const handleChange = (
    _: SelectChangeEvent<SelectValue<string>>,
    value: string,
  ) => {
    setControlledValue(value);
    onChange(null as never, {
      value: value,
      key: "units", // todo: type
    });
  };

  return (
    <Select
      value={controlledValue}
      items={Object.values(UNITS).map((unit, index) => ({
        label: unit,
        value: unit,
        id: index,
      }))}
      onChange={handleChange}
    />
  );
};
