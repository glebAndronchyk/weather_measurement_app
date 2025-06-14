import type { CreateMeasurementRequestPayloadWithTemporalId } from "../../../../app/api/types/CreateMeasurementRequestPayload.ts";
import { DataGrid } from "@mui/x-data-grid";
import { useMemo } from "react";
import { objectToColumnDefinition } from "../../../../shared/lib/mui";
import { useMapControlsViewModel } from "../../viewmodel";

const getObjectKeysEntries = (obj: object): string[][] => {
  const keys = Object.keys(obj);
  const entries = keys.flatMap((key) =>
    typeof obj[key] === "object"
      ? getObjectKeysEntries(obj[key])
      : [[key, key]],
  );

  return entries;
};

const createKeysObject = (data: object[]) => {
  return data.reduce((entry, currentValue) => {
    const flatEntries = getObjectKeysEntries(currentValue);

    return {
      ...Object.fromEntries(flatEntries),
      ...entry,
    };
  }, {});
};

const oneLevelDeep = (data: object) => {
  let result = {};

  for (const val in data) {
    if (typeof data[val] === "object") {
      result = { ...result, ...oneLevelDeep(data[val]) };
    } else {
      result[val] = data[val];
    }
  }

  return result;
};

export const MeasurementBufferDataGrid = () => {
  const {
    state: { measurementsBuffer },
  } = useMapControlsViewModel();

  const { columns, rows } = useMemo(() => {
    const rows = measurementsBuffer.entries.map(({ area, ...entry }) => {
      console.warn(`ignored: area: ${area}`);
      return oneLevelDeep(entry);
    }) as Pick<CreateMeasurementRequestPayloadWithTemporalId, "temporalId">[];
    const columns = objectToColumnDefinition(createKeysObject(rows));

    return {
      columns,
      rows,
    };
  }, [measurementsBuffer]);

  return (
    <DataGrid
      getRowId={(
        row: Pick<CreateMeasurementRequestPayloadWithTemporalId, "temporalId">,
      ) => row.temporalId}
      columns={columns}
      rows={rows}
    />
  );
};
