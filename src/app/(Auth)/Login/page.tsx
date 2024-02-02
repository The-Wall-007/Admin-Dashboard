import React from "react";
import { CssBaseline, Stack } from "@mui/material";
import LoginForm from "./Components/LoginForm";

const containerStyle: React.CSSProperties = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  height: "calc(100vh)",
};

const LoginPage: React.FC = async () => {
  return (
    <Stack component="main" style={containerStyle}>
      <CssBaseline />
      <LoginForm />
    </Stack>
  );
};

export default LoginPage;
