"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  Typography,
  Avatar,
  Stack,
  SxProps,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { firebaseConfig } from "@/api/firebase";
import { Theme } from "@emotion/react";

interface LoginFormValues {
  email: string;
  password: string;
}

initializeApp(firebaseConfig);
const auth = getAuth();

const signIn = async (formData: LoginFormValues) => {
  await signInWithEmailAndPassword(auth, formData.email, formData.password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      const token = userCredential.user?.getIdToken();

      if (user && token) {
        alert(JSON.stringify(await token));
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + "   " + errorMessage);
    });
};

const LoginForm: React.FC = () => {
  const { handleSubmit, control } = useForm<LoginFormValues>();

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
        <Avatar sx={avatarStyle}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
      </Stack>

      <form onSubmit={handleSubmit(signIn)}>
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
          sx={submitButtonStyle}
        >
          Sign In
        </Button>
      </form>
    </Stack>
  );
};

export default LoginForm;

const avatarStyle: SxProps<Theme> | undefined = {
  margin: "8px",
  backgroundColor: "secondary",
};

const submitButtonStyle: SxProps<Theme> | undefined = {
  margin: "24px 0 16px",
};
