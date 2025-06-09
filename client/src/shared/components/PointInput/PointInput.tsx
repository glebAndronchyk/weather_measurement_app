import { Stack, type SxProps, TextField, type Theme } from "@mui/material";
import type { Coordinates } from "../../types/Coordinates.ts";
import type { ChangeEvent, FC } from "react";
import { rem } from "../../../lib/css/rem.ts";

export interface PointInputProps {
  coordinates: Coordinates<string> | null;
  onChange: (
    e: ChangeEvent<HTMLInputElement>,
    value: (string | null)[],
  ) => void;
  containerSx?: SxProps<Theme>;
}

const getCoordinateIndexByType = (type: "lat" | "lon" | "alt") => {
  switch (type) {
    case "lat":
      return 0;
    case "lon":
      return 1;
    default:
      return 2;
  }
};

export const PointInput: FC<PointInputProps> = (props) => {
  const { coordinates, onChange, containerSx } = props;

  const handleCoordinateChange =
    (type: "lat" | "lon" | "alt") => (e: ChangeEvent<HTMLInputElement>) => {
      const coordinatesCopy = [...(coordinates || [])];
      const idx = getCoordinateIndexByType(type);

      coordinatesCopy[idx] = e.target.value;

      onChange(e, coordinatesCopy);
    };

  return (
    <Stack gap={rem(12)} sx={containerSx} flexDirection="row">
      <TextField
        type="number"
        label="LAT"
        value={coordinates?.[0] || ""}
        onChange={handleCoordinateChange("lat")}
      />
      <TextField
        type="number"
        label="LNG"
        value={coordinates?.[1] || ""}
        onChange={handleCoordinateChange("lon")}
      />
      <TextField
        type="number"
        label="ALT"
        value={coordinates?.[2] || ""}
        onChange={handleCoordinateChange("alt")}
      />
    </Stack>
  );
};
