import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Notification } from "../types/Notification";

interface Props {
  notification: Notification | null;
  onClose: () => void;
}

const NotificationAlert: React.FC<Props> = ({ notification, onClose }) => {
  return (
    <Snackbar
      open={notification !== null}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={notification?.type || "info"}
        sx={{ width: "100%" }}
      >
        {notification?.message || ""}
      </Alert>
    </Snackbar>
  );
};

export default NotificationAlert;
