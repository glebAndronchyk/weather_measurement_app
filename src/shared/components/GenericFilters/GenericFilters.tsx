import { useRef } from "react";
import { Box, Stack } from "@mui/material";
import type {
  FiltersObjectChangePayload,
  FilterChangePayload,
} from "./GenericFilters.types";

export const GenericFilters = (props) => {
  const { filters, onFilterChange } = props;
  const filtersRef = useRef<FiltersObjectChangePayload>({});

  const handleChange = (e: never, data: FilterChangePayload) => {
    filtersRef.current[data.key] = data.value;
    onFilterChange(e, filtersRef.current);
  };

  return (
    <Stack>
      {filters.map((filter) => (
        <Box key={filter.id}>
          <Box>{filter.label}</Box>
          <Box>
            <filter.component onChange={handleChange} />
          </Box>
        </Box>
      ))}
    </Stack>
  );
};
