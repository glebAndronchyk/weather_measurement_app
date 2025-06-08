import { useMutation } from "@tanstack/react-query";
import { Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getLocationWithMeasurements } from "../../../../app/api/fetchers/getLocationWithMeasurements.ts";
import { type FC, useEffect } from "react";
import {
  objectToColumnDefinition,
  usePagination,
} from "../../../../shared/lib/mui";

interface LocationMeasurementsControlsProps {
  selectedLocation: null;
  dataFlow: never;
  isLatestLookup?: boolean;
}

export const LocationMeasurementsControls: FC<
  LocationMeasurementsControlsProps
> = (props) => {
  const { selectedLocation, dataFlow, isLatestLookup } = props;
  const {
    model,
    state: { take, skip },
    controls: { onPaginationModelChange },
  } = usePagination();

  const {
    mutate: getWholeLocationMeasurements,
    data: fullListOfMeasurements,
    isPending,
  } = useMutation({
    mutationKey: ["locationMeasurements"],
    mutationFn: () =>
      getLocationWithMeasurements(
        selectedLocation?.id || -1,
        take,
        skip,
        dataFlow,
      ),
  });

  const {
    mutate: getLatestLocationMeasurement,
    data: latestListOfMeasurements,
  } = useMutation({
    mutationKey: ["latestLocationMeasurements"],
    mutationFn: () =>
      getLocationWithMeasurements(
        selectedLocation?.id || -1,
        take,
        skip,
        dataFlow,
      ),
  });

  const hasData =
    Boolean(fullListOfMeasurements) || Boolean(latestListOfMeasurements);

  const onInitialSearch = (fn: VoidFunction) => () => fn();
  const shownData = isLatestLookup
    ? latestListOfMeasurements
    : fullListOfMeasurements;

  useEffect(() => {
    if (selectedLocation) {
      getWholeLocationMeasurements();
    }
  }, [model, selectedLocation]);

  return (
    <Stack>
      <Button
        disabled={!selectedLocation}
        onClick={onInitialSearch(getWholeLocationMeasurements)}
        variant="contained"
      >
        Get Location Measurements
      </Button>
      <Button
        disabled={!selectedLocation}
        onClick={onInitialSearch(getLatestLocationMeasurement)}
        variant="contained"
      >
        Get Latest Location Measurements
      </Button>
      {hasData && selectedLocation && (
        <DataGrid
          loading={isPending}
          paginationMode="server"
          pageSizeOptions={[5, 10, 25]}
          paginationModel={model}
          onPaginationModelChange={onPaginationModelChange}
          columns={objectToColumnDefinition(shownData?.items[0] || {})}
          rows={shownData?.items || []}
          rowCount={shownData?.totalItems}
        />
      )}
    </Stack>
  );
};
