import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface SnackbarProps {
  open: boolean;
  message: string;
  severity: "error" | "success" | "info" | "warning";
  onClose: () => void;
}

const MessageSnackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  severity,
  onClose,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MessageSnackbar;
