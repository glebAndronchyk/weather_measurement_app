import { Box, Button, ClickAwayListener, Modal } from "@mui/material";
import {
  CenterContent,
  ModalContent,
} from "../../../../shared/components/modals";
import type { FC } from "react";
import { modalPool } from "../../../../app/lib/modalPool.tsx";
import PlusOneOutlined from "@mui/icons-material/PlusOneOutlined";
import { CreateMeasurementForm } from "../../components/CreateMeasurementForm.tsx";
import type { CreateMeasurementRequestPayload } from "../../../../app/api/types/CreateMeasurementRequestPayload.ts";

interface CreateMeasurementModalProps {
  closeModal?: VoidFunction;
  openRelatedModal?: (props: object) => void;
  onCreateMeasurementEntry: (
    measurement: Omit<CreateMeasurementRequestPayload, "area">,
  ) => void;
}

const CreateMeasurementModalBase: FC<CreateMeasurementModalProps> = (props) => {
  const { closeModal, onCreateMeasurementEntry } = props;

  const handleMeasurementCreation = (
    measurement: Omit<CreateMeasurementRequestPayload, "area">,
  ) => {
    onCreateMeasurementEntry(measurement);
    closeModal!();
  };

  return (
    <Modal open onClose={closeModal!}>
      <CenterContent>
        <ClickAwayListener onClickAway={closeModal!}>
          <ModalContent>
            <CreateMeasurementForm
              onCreateMeasurementEntry={handleMeasurementCreation}
            />
          </ModalContent>
        </ClickAwayListener>
      </CenterContent>
    </Modal>
  );
};

const AddMeasurementButton: FC<
  CreateMeasurementModalProps & { modalKey?: string; disabled: boolean }
> = (props) => {
  const { openRelatedModal, disabled, onCreateMeasurementEntry } = props;

  const handleOpen = () => {
    openRelatedModal!({ onCreateMeasurementEntry });
  };

  return (
    <Button
      disabled={disabled}
      variant="outlined"
      onClick={handleOpen}
      startIcon={<PlusOneOutlined />}
    >
      Create Measurement
    </Button>
  );
};

export const CreateMeasurementModalTrigger = modalPool(
  "create-measurement-modal",
  CreateMeasurementModalBase,
  AddMeasurementButton,
);
