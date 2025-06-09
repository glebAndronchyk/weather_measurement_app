import { Button, ClickAwayListener, Modal } from "@mui/material";
import PlusOneOutlined from "@mui/icons-material/PlusOneOutlined";
import { LocationForm } from "../../components/LocationForm";
import { modalPool } from "../../../../app/lib/modalPool";
import {
  CenterContent,
  ModalContent,
} from "../../../../shared/components/modals";

const CreateLocationModalBase = (props) => {
  const { closeModal } = props;

  return (
    <Modal open onClose={() => console.log(1)}>
      <CenterContent>
        <ClickAwayListener onClickAway={closeModal}>
          <ModalContent>
            <LocationForm />
          </ModalContent>
        </ClickAwayListener>
      </CenterContent>
    </Modal>
  );
};

export const AddLocationButton = (props) => {
  const { openRelatedModal } = props;

  return (
    <Button
      variant="outlined"
      onClick={openRelatedModal}
      startIcon={<PlusOneOutlined />}
    >
      Create Location
    </Button>
  );
};

export const CreateLocationModalTrigger = modalPool(
  "create-location-modal",
  CreateLocationModalBase,
  AddLocationButton,
);
