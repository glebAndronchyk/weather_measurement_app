import type { GridColDef, GridColType } from "@mui/x-data-grid";

export const objectToColumnDefinition = (
  obj?: object,
  colPredicate?: (key: string) => boolean,
): GridColDef[] => {
  if (!obj) return [];

  const keys = Object.keys(obj);

  return keys
    .map((key) => ({
      type: typeof obj[key] as GridColType,
      field: key,
      getOptionLabel() {
        return key;
      },
    }))
    .filter((col) => (!colPredicate ? true : colPredicate(col.field)));
};
