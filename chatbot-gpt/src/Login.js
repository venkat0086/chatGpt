import { Button } from "@mui/material";
import React from "react";

const Login = () => {
  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };
  return (
    <div>
      <div className="flex h-screen items-center justify-center">
        <Button variant="outlined" onClick={googleAuth}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
