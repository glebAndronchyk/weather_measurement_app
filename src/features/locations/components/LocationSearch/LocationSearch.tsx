import { type FC, type SyntheticEvent, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getLocations } from "../../../../app/api/fetchers/getLocations.ts";
import { Autocomplete, TextField } from "@mui/material";

interface LocationSearchProps {
  onChange: (location: never) => void;
}

export const LocationSearch: FC<LocationSearchProps> = (props) => {
  const { onChange } = props;

  const [searchString, setSearchString] = useState("");

  const { mutate, data, isPending } = useMutation({
    mutationKey: ["location"],
    mutationFn: (search: string) => getLocations(search),
  });

  useEffect(() => {
    if (searchString) {
      mutate(searchString);
    }
  }, [searchString]);

  const handleInputChange = (_: SyntheticEvent, value: string) => {
    setSearchString(value.toLowerCase());
  };

  const handleChange = (_: SyntheticEvent, value) => {
    onChange(value);
  };

  return (
    <Autocomplete
      loading={isPending}
      getOptionLabel={(option) => Object.values(option.metadata).join(", ")}
      onChange={handleChange}
      onInputChange={handleInputChange}
      options={data || []}
      renderInput={(params) => (
        <TextField
          placeholder="Search for location"
          {...params}
          slotProps={{
            input: {
              ...params.InputProps,
            },
          }}
        />
      )}
    />
  );
};
