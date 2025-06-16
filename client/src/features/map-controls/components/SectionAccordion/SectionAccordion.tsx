import type { FC, ReactNode } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface SectionAccordionProps {
  title: ReactNode;
  children: ReactNode;
}

export const SectionAccordion: FC<SectionAccordionProps> = (props) => {
  const { title, children } = props;

  return (
    <Accordion
      elevation={0}
      sx={(theme) => ({
        border: `1px solid ${theme.palette.grey[400]}`,
      })}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {title}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
