import { Alert } from "@mui/material";
import React from "react";

const AlertPop = ({ content, severity }) => {
  return (
    <div className="fixed right-1 top-1">
      <Alert variant="filled" severity={severity}>
        {content}
      </Alert>
    </div>
  );
};

export default AlertPop;
