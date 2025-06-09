import { Switch } from "@mui/material";
import type { GenericFilterComponent } from "../../../../../../shared/components/GenericFilters";
import { type ChangeEvent, useEffect, useState } from "react";

export const PaginationModeSwitch: GenericFilterComponent = (props) => {
  const [controlledValue, setControlledValue] = useState("area");
  const { onChange } = props;

  const _handleGenericChange = () => {
    onChange(null as never, {
      value: controlledValue,
      key: "lookupType",
    });
  };

  const handleChange = (_: ChangeEvent, checked: boolean) => {
    setControlledValue(checked ? "pagination" : "area");
  };

  useEffect(_handleGenericChange, [controlledValue]);

  return (
    <Switch
      onChange={handleChange}
      checked={controlledValue === "pagination"}
    />
  );
};
