import { SectionAccordion } from "../SectionAccordion";
import { useMapControlsViewModel } from "../../viewmodel";
import { useMapViewPageViewModel } from "../../../../app/routing/pages/MapViewPage/viewmodel";
import { useEffect, useMemo } from "react";
import { CreateMeasurementModalTrigger } from "../../../measurements";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { objectToColumnDefinition } from "../../../../shared/lib/mui";
import type { CreateMeasurementRequestPayloadWithTemporalId } from "../../../../app/api/types/CreateMeasurementRequestPayload.ts";

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
  console.log(data);
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

export const MeasurementsCreator = () => {
  const {
    state: { measurementsBuffer },
    updateViewModelState,
  } = useMapControlsViewModel();
  const { enterCreatorMode, enterNormalMode, mapMode, drawLayerReference } =
    useMapViewPageViewModel();

  useEffect(() => {
    if (measurementsBuffer.isSomethingCreating) {
      enterCreatorMode();
    } else {
      enterNormalMode();
    }
  }, [measurementsBuffer.isSomethingCreating]);

  const handleSave = () => {
    enterNormalMode();
  };

  const handleMeasurementCreation = (
    measurement: CreateMeasurementRequestPayloadWithTemporalId,
  ) => {
    updateViewModelState({
      type: "addNewMeasurement",
      payload: measurement,
    });
  };

  const { columns, rows } = useMemo(() => {
    const rows = measurementsBuffer.entries.map((entry) =>
      oneLevelDeep(entry),
    ) as Pick<CreateMeasurementRequestPayloadWithTemporalId, "temporalId">[];
    const columns = objectToColumnDefinition(createKeysObject(rows));

    return {
      columns,
      rows,
    };
  }, [measurementsBuffer]);

  return (
    <SectionAccordion title="Measurements creator">
      {measurementsBuffer.hasEntries && (
        <DataGrid
          getRowId={(
            row: Pick<
              CreateMeasurementRequestPayloadWithTemporalId,
              "temporalId"
            >,
          ) => row.temporalId}
          columns={columns}
          rows={rows}
        />
      )}
      <CreateMeasurementModalTrigger
        disabled={measurementsBuffer.isSomethingCreating}
        onCreateMeasurementEntry={handleMeasurementCreation}
      />
      {measurementsBuffer.hasEntries &&
        !measurementsBuffer.isSomethingCreating && (
          <Button onClick={handleSave}>Save</Button>
        )}
    </SectionAccordion>
  );
};
