import {
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { type ChangeEvent, type FC, type MouseEvent } from "react";
import {
  objectToColumnDefinition,
  usePagination,
} from "../../../../shared/lib/mui";
import { useLocationMeasurements } from "./hooks/useLocationMeasurements.ts";
import type { MeasurementLookupType } from "../../../../shared/types/MeasurementLookupType.ts";
import type { Location } from "../../../../app/api/types/Location.ts";
import { km_to_m, m_to_km } from "../../../../lib/math/phys";

interface LocationMeasurementsControlsProps {
  selectedLocation: Location | null;
  dataFlow: string;
  lookupWithin: number;
  lookupType: MeasurementLookupType;
  onLookupTypeChange: (lookupType: MeasurementLookupType) => void;
  onWithinChange: (m: number) => void;
}

export const LocationMeasurementsControls: FC<
  LocationMeasurementsControlsProps
> = (props) => {
  const {
    selectedLocation,
    dataFlow,
    lookupWithin,
    onWithinChange,
    lookupType,
    onLookupTypeChange,
  } = props;

  const {
    model,
    state: { take, skip },
    controls: { onPaginationModelChange },
  } = usePagination();

  const { hasData, measurementsQuery } = useLocationMeasurements({
    take,
    lookupType,
    selectedLocation,
    skip,
    dataFlow,
    lookupWithin,
  });

  const data = measurementsQuery.data;

  const handleLookupTypeChange = (
    _: MouseEvent,
    value: MeasurementLookupType[],
  ) => {
    onLookupTypeChange(value[0]);
  };

  const handleWithinChange = (e: ChangeEvent<HTMLInputElement>) => {
    onWithinChange(km_to_m(Number(e.target.value)));
  };

  const columns = objectToColumnDefinition(
    data?.items?.[0],
    (field) => field !== "area",
  );

  return (
    <Stack gap={2}>
      <Stack flexDirection="row" alignItems="center" gap={2}>
        <Typography>Measurement:</Typography>
        <ToggleButtonGroup
          disabled={!selectedLocation}
          onChange={handleLookupTypeChange}
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="latest">Latest</ToggleButton>
        </ToggleButtonGroup>
        <Typography>Within (km):</Typography>
        <TextField
          type="number"
          onChange={handleWithinChange}
          value={m_to_km(lookupWithin)}
        />
      </Stack>
      {hasData && selectedLocation && (
        <DataGrid
          loading={measurementsQuery.isPending}
          paginationMode="server"
          pageSizeOptions={[5, 10, 25]}
          paginationModel={model}
          onPaginationModelChange={onPaginationModelChange}
          columns={columns}
          rows={data?.items || []}
          rowCount={data?.totalItems || 0}
        />
      )}
    </Stack>
  );
};
