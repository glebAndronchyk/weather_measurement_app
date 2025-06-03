import type { GenericFilterComponent } from "../../../../../shared/components/GenericFilters";
import { type ChangeEvent, useEffect, useState } from "react";
import { Box, Stack, TextField } from "@mui/material";
import type { Coordinates } from "../../../../../shared/types/Coordinates.ts";
import { PointInput } from "../../../../../shared/components/PointInput/index.ts";
import { rem } from "../../../../../lib/css/rem.ts";

export const CoordinatesFilter: GenericFilterComponent = (props) => {
  const { onMultiKeyChange } = props;
  const [controlledValue, setControlledValue] = useState<{
    within: number | null;
    coordinates: Coordinates<string> | null;
  }>({
    within: null,
    coordinates: null,
  });

  const _handleGenericChange = () => {
    if (
      controlledValue.within &&
      controlledValue.coordinates?.every(
        (val) => ![undefined, null, NaN, ""].includes(val as never),
      )
    ) {
      onMultiKeyChange(null as never, [
        {
          value: controlledValue.within,
          key: "within",
        },
        {
          value: controlledValue.coordinates,
          key: "coordinates",
        },
      ]);
    }
  };

  const handleWithinValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setControlledValue((prevState) => ({
      ...prevState,
      within: e.target.value ? parseFloat(e.target.value) : null,
    }));
  };

  const handleCoordinatesValueChange = (
    _: ChangeEvent<HTMLInputElement>,
    value: (string | null)[],
  ) => {
    setControlledValue((prevState) => ({
      ...prevState,
      coordinates: value as Coordinates<string>,
    }));
  };

  useEffect(_handleGenericChange, [controlledValue]);

  return (
    <Stack gap={rem(12)}>
      <Box>
        <TextField
          fullWidth
          type="number"
          label="Meters within point"
          value={controlledValue.within || ""}
          onChange={handleWithinValueChange}
        />
      </Box>
      <PointInput
        coordinates={controlledValue.coordinates}
        onChange={handleCoordinatesValueChange}
      />
    </Stack>
  );
};
