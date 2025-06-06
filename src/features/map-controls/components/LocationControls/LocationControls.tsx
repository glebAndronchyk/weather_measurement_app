import { Stack } from "@mui/material";
import { SectionAccordion } from "../SectionAccordion";
import { CreateLocationModalTrigger } from "../../../locations";

export const LocationControls = () => {
  return (
    <SectionAccordion title="Location controls">
      <Stack gap={12}>
        <CreateLocationModalTrigger />
      </Stack>
    </SectionAccordion>
  );
};
