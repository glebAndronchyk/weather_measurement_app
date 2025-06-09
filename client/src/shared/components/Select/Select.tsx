import {
  MenuItem,
  Select as MuiSelect,
  type SelectChangeEvent,
  type SelectProps as MuiSelectProps,
} from "@mui/material";

export interface SelectValue<T> {
  id: string | number;
  label: string;
  value: T;
}

export type SelectProps<T> = Omit<MuiSelectProps, "onChange"> & {
  items: SelectValue<T>[];
  onChange: (e: SelectChangeEvent<SelectValue<T>>, value: string) => void;
};

export const Select = <T extends string | string[] | number>(
  props: SelectProps<T>,
) => {
  const { items, onChange, ...restProps } = props;

  const handleChange = (e: SelectChangeEvent<SelectValue<T>>) => {
    const value = e.target.value;
    onChange(e, value as string);
  };

  return (
    <MuiSelect<SelectValue<T>>
      {...(restProps as never[])}
      onChange={handleChange}
    >
      {items.map((entry) => (
        <MenuItem key={entry.id} value={entry.value}>
          {entry.label}
        </MenuItem>
      ))}
    </MuiSelect>
  );
};
