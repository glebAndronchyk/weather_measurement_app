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

  const handleMultiKeyChange = (e: never, data: FilterChangePayload[]) => {
    data.forEach((entry) => handleChange(e, entry));
  };

  return (
    <Stack gap={2}>
      {filters.map((filter) => (
        <Box key={filter.id}>
          <Box marginBottom="12px">{filter.label}</Box>
          <Box>
            <filter.component
              onMultiKeyChange={handleMultiKeyChange}
              onChange={handleChange}
            />
          </Box>
        </Box>
      ))}
    </Stack>
  );
};
