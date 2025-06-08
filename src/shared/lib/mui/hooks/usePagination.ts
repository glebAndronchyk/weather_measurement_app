import { useMemo, useState } from "react";
import { type GridPaginationModel } from "@mui/x-data-grid/models";

export const usePagination = (args?: {
  defaultPageSize?: number;
  startPage?: number;
}) => {
  const { defaultPageSize = 10, startPage = 0 } = args || {};

  const [pageNumber, setPageNumber] = useState(startPage);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const onPaginationModelChange = (details: GridPaginationModel) => {
    setPageNumber(details.page);
    setPageSize(details.pageSize);
  };

  const returnValue = useMemo(
    () => ({
      model: {
        pageSize,
        page: pageNumber,
      } as GridPaginationModel,
      state: {
        take: pageSize,
        skip: pageNumber * pageSize,
      },
      controls: {
        setPageNumber,
        setPageSize,
        onPaginationModelChange,
      },
    }),
    [pageNumber, pageSize],
  );

  return returnValue;
};
