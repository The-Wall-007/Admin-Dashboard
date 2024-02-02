import React from "react";
import { CssBaseline, Stack, SxProps } from "@mui/material";
import { Theme } from "@emotion/react";

import LoginForm from "./Components/LoginForm";

const LoginPage: React.FC = async () => {
  return (
    <Stack component="main" sx={containerStyle}>
      <CssBaseline />
      <LoginForm />
    </Stack>
  );
};

export default LoginPage;

const containerStyle: SxProps<Theme> | undefined = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  height: "calc(100vh)",
};
