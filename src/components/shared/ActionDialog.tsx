import React, { KeyboardEvent } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

interface ActionDialogProps {
  open: boolean;
  handleClose?: () => void;
  title: string;
  contentText: string;
  onCancelText?: string;
  onConfirmText?: string;
  onConfirm: () => void;
  loading?: boolean;
}

const ActionDialog: React.FC<ActionDialogProps> = ({
  title,
  contentText,
  onCancelText,
  onConfirmText,
  onConfirm,
  open,
  handleClose,
  loading,
}) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !loading) {
      onConfirm();
    } else if (event.key === "Escape") {
      handleClose?.();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onKeyDown={handleKeyDown}
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {handleClose && (
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              minWidth: 80,
              minHeight: 36,
            }}
          >
            {onCancelText || "Cancel"}
          </Button>
        )}
        <Button
          variant="contained"
          onClick={onConfirm}
          autoFocus
          sx={{
            minWidth: 80,
            minHeight: 36,
          }}
        >
          {onConfirmText || "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionDialog;
