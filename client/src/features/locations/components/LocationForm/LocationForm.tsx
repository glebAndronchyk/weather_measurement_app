import { Controller, useForm } from "react-hook-form";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type LocationFormValidationSchema,
  locationFormValidationSchema,
} from "./LocationForm.schema.ts";
import { useEffect } from "react";
import type { PostLocationDTO } from "../../../../app/api/types/PostLocationDTO.ts";
import { postLocation } from "../../../../app/api/fetchers/postLocation.ts";
import { PointInput } from "../../../../shared/components/PointInput";
import type { Coordinates } from "../../../../shared/types/Coordinates.ts";

export const LocationForm = () => {
  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      locationCenter: [],
      locationType: "",
      locationMetadata: "",
    },
    resolver: zodResolver(locationFormValidationSchema),
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["location"],
    mutationFn: (data: PostLocationDTO) => postLocation(data),
  });

  const locationCoordinates = watch("locationCenter");

  const onSubmit = (data: LocationFormValidationSchema) => {
    mutate({
      metadata: data.locationMetadata,
      point: data.locationCenter.map((entry) =>
        String(entry),
      ) as Coordinates<string>,
      type: data.locationType,
    });
  };

  useEffect(() => {
    reset();
  }, [isSuccess]);

  return (
    <Stack>
      <Typography variant="h5">Create Location</Typography>
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
          name="locationType"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              onChange={onChange}
              value={value}
              label="Location type"
            />
          )}
        />

        <Controller
          name="locationCenter"
          control={control}
          render={({ field: { onChange } }) => (
            <PointInput
              coordinates={locationCoordinates}
              onChange={(_, value) => onChange(value)}
            />
          )}
        />

        <Controller
          name="locationMetadata"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              multiline
              minRows={10}
              onChange={onChange}
              value={value}
              label="Location metadata"
            />
          )}
        />

        <Button
          disabled={!isValid || isPending}
          variant="contained"
          type="submit"
        >
          Save Location
        </Button>
      </Box>
    </Stack>
  );
};
