import type { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimeField } from "@mui/x-date-pickers";
import { RenderGenericMetrics } from "./RenderGenericMetrics";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CreateMeasurementRequestPayload } from "../../../app/api/types/CreateMeasurementRequestPayload.ts";
import {
  type CreateMeasurementFormSchema,
  createMeasurementPayloadValidation,
} from "./CreateMeasurementForm.schema.ts";
import { MEASUREMENT_TYPE } from "../../../app/api/enums/MEASUREMENT_TYPE.ts";
import { UNITS } from "../../../shared/constants/UNITS.ts";
import dayjs from "dayjs";

interface CreateMeasurementFormProps {
  onCreateMeasurementEntry: (
    measurement: Omit<CreateMeasurementRequestPayload, "area">,
  ) => void;
}

export const CreateMeasurementForm: FC<CreateMeasurementFormProps> = (
  props,
) => {
  const { onCreateMeasurementEntry } = props;
  const {
    handleSubmit,
    watch,
    control,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      type: "",
      unit: "",
      timestamp: "",
      device_id: "",
      genericMetrics: {},
    },
    resolver: zodResolver(createMeasurementPayloadValidation),
  });

  const measurementType = watch("type");

  const onSubmit = (data: CreateMeasurementFormSchema) => {
    onCreateMeasurementEntry(data as never);
  };

  // todo: fix date
  return (
    <Stack>
      <Typography variant="h5">Create buffered measurement</Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="type"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              value={value}
              onChange={(_, newValue) => onChange(newValue || "")}
              getOptionLabel={(opt) => opt}
              options={Object.values(MEASUREMENT_TYPE)}
              renderInput={(params) => (
                <TextField
                  placeholder="Measurement type"
                  {...params}
                  slotProps={{
                    input: {
                      ...params.InputProps,
                    },
                  }}
                />
              )}
            />
          )}
        />
        <Controller
          name="unit"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              value={value}
              onChange={(_, newValue) => onChange(newValue || "")}
              getOptionLabel={(opt) => opt}
              options={Object.values(UNITS)}
              renderInput={(params) => (
                <TextField
                  placeholder="Unit"
                  {...params}
                  slotProps={{
                    input: {
                      ...params.InputProps,
                    },
                  }}
                />
              )}
            />
          )}
        />
        <Controller
          name="device_id"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              value={value}
              label="Device"
              type="number"
              onChange={onChange}
            />
          )}
        />
        <Controller
          name="timestamp"
          control={control}
          render={({ field: { onChange, value } }) => (
            <DateTimeField
              error={false}
              value={value ? dayjs(value) : dayjs()}
              onChange={(data) => {
                onChange(data!.format("YYYY-mm-DD"));
              }}
              label="Timestamp"
            />
          )}
        />
        <RenderGenericMetrics
          metricsFieldKey="genericMetrics"
          control={control}
          measurementType={measurementType as never}
        />

        <Button variant="contained" disabled={!isValid} type="submit">
          Create measurement
        </Button>
      </Box>
    </Stack>
  );
};
