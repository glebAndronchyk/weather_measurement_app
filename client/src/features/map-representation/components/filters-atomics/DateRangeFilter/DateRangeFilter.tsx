import type { GenericFilterComponent } from "../../../../../shared/components/GenericFilters";
import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { DateTimeField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { rem } from "../../../../../lib/css/rem.ts";

export const DateRangeFilter: GenericFilterComponent = (props) => {
  const { onMultiKeyChange } = props;
  const [controlledValue, setControlledValue] = useState({
    from: dayjs(),
    to: dayjs(),
  });

  // todo: validation

  const _handleGenericChange = () => {
    if (controlledValue.from.isValid() && controlledValue.to.isValid()) {
      onMultiKeyChange(null as never, [
        {
          value: controlledValue.from.toISOString(),
          key: "dateStart",
        },
        {
          value: controlledValue.to.toISOString(),
          key: "dateEnd",
        },
      ]);
    }
  };

  const handleFromChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setControlledValue((prevState) => ({
        ...prevState,
        from: newValue,
      }));
    }
  };

  const handleToChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setControlledValue((prevState) => ({
        ...prevState,
        to: newValue,
      }));
    }
  };

  useEffect(_handleGenericChange, [controlledValue]);

  return (
    <Stack flexDirection="row" alignItems="center" gap={rem(12)}>
      <DateTimeField
        error={false}
        onChange={handleFromChange}
        label="From"
        value={controlledValue.from}
      />
      <Typography>-</Typography>
      <DateTimeField
        error={false}
        onChange={handleToChange}
        label="To"
        value={controlledValue.to}
      />
    </Stack>
  );
};
