import { Box, TextField } from "@mui/material";
import type { MEASUREMENT_TYPE } from "../../../app/api/enums/MEASUREMENT_TYPE.ts";
import type { ChangeEvent, FC } from "react";
import { type Control, Controller } from "react-hook-form";

interface RenderGenericMetricsProps {
  measurementType: keyof typeof MEASUREMENT_TYPE;
  metricsFieldKey: string;
  control: Control<any>;
}

export const RenderGenericMetrics: FC<RenderGenericMetricsProps> = (props) => {
  const { measurementType, control, metricsFieldKey } = props;

  if (!measurementType) return null;

  switch (measurementType) {
    case "TEMPERATURE_MEASUREMENT":
      return (
        <Controller
          control={control}
          name={`${metricsFieldKey}.temperature`}
          render={({ field: { onChange, value } }) => {
            const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
              const val = e.target.value;
              onChange(parseFloat(val));
            };

            return (
              <TextField
                label="Temperature"
                type="number"
                onChange={handleChange}
                value={value}
              />
            );
          }}
        />
      );
    default:
      return <Box>Not Implemented</Box>;
  }
};
