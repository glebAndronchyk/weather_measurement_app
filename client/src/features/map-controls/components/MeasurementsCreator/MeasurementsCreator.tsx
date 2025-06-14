import { SectionAccordion } from "../SectionAccordion";
import { useMapControlsViewModel } from "../../viewmodel";
import { useMapViewPageViewModel } from "../../../../app/routing/pages/MapViewPage/viewmodel";
import { CreateMeasurementModalTrigger } from "../../../measurements";
import { Button } from "@mui/material";
import type { CreateMeasurementRequestPayloadWithTemporalId } from "../../../../app/api/types/CreateMeasurementRequestPayload.ts";
import { useDrawerModeToggle } from "./hooks/useDrawerModeToggle.ts";
import { useAlignMeasurementPolygon } from "./hooks/useAlignMeasurementPolygon.ts";
import { MeasurementBufferDataGrid } from "../MeasurementBufferDataGrid";
import { useMutation } from "@tanstack/react-query";
import { postMeasurements } from "../../../../app/api/fetchers/postMeasurements.ts";

export const MeasurementsCreator = () => {
  const {
    state: { measurementsBuffer },
    updateViewModelState,
  } = useMapControlsViewModel();
  const { measurementsDrawLayerReference } = useMapViewPageViewModel();

  useDrawerModeToggle();
  useAlignMeasurementPolygon();

  const { mutateAsync: registerMeasurements } = useMutation({
    mutationKey: ["measurements"],
    mutationFn: (data: CreateMeasurementRequestPayloadWithTemporalId[]) =>
      postMeasurements(data),
  });

  const handleSave = async () => {
    await registerMeasurements(measurementsBuffer.entries);
    measurementsDrawLayerReference.current!.deleteAll();
    updateViewModelState({
      type: "clearMeasurementBuffer",
    });
  };

  const handleMeasurementCreation = (
    measurement: CreateMeasurementRequestPayloadWithTemporalId,
  ) => {
    updateViewModelState({
      type: "addNewMeasurement",
      payload: measurement,
    });
  };

  return (
    <SectionAccordion title="Measurements creator">
      {measurementsBuffer.hasEntries && <MeasurementBufferDataGrid />}
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
