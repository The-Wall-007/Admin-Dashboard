"use client";

import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, TextField, Typography, Avatar, Stack } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

interface LoginFormValues {
  email: string;
  password: string;
}

const avatarStyle: React.CSSProperties = {
  margin: "8px",
  backgroundColor: "secondary",
};

const formStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "8px",
};

const submitButtonStyle: React.CSSProperties = {
  margin: "24px 0 16px",
};

const LoginForm: React.FC = () => {
  const { handleSubmit, control } = useForm<LoginFormValues>();

  const onSubmit = () => {};

  return (
    <Stack>
      <Stack
        component={"div"}
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar style={avatarStyle}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={submitButtonStyle}
        >
          Sign In
        </Button>
      </form>
    </Stack>
  );
};

export default LoginForm;
