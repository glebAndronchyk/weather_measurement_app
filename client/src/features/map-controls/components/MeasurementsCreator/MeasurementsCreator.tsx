import { SectionAccordion } from "../SectionAccordion";
import { useMapControlsViewModel } from "../../viewmodel";
import { useMapViewPageViewModel } from "../../../../app/routing/pages/MapViewPage/viewmodel";
import { useEffect } from "react";
import { CreateMeasurementModalTrigger } from "../../../measurements";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

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

  const handleMeasurementCreation = (measurement: never) => {
    updateViewModelState({
      type: "addNewMeasurement",
      payload: measurement,
    });
  };

  return (
    <SectionAccordion title="Measurements creator">
      {measurementsBuffer.hasEntries && <DataGrid columns={[]} />}
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
