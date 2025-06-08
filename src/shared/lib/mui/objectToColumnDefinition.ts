import type { GridColDef, GridColType } from "@mui/x-data-grid";

export const objectToColumnDefinition = (obj: object): GridColDef[] => {
  const keys = Object.keys(obj);

  return keys.map((key) => ({
    type: typeof obj[key] as GridColType,
    field: key,
    getOptionLabel() {
      return key;
    },
  }));
};
