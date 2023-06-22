import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { registerAction } from "../../../store/asyncFunction/register";
import { getTokenLS } from "../../../store/ls";
import { swalFire, validateEmail } from "../../helpers";
import styles from "./index.module.css";
export interface IUserRegister {
  user_name: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
}

const theme = createTheme();
export default function SignUp() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    user_name: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
  });
  const [userInUse, setUserInUse] = useState(false);
  useEffect(() => {
    const isTokenExists = getTokenLS();
    if (isTokenExists) {
      navigate("/");
    }
  });
  async function registerHandler() {
    if (
      !user.user_name ||
      !user.password ||
      !user.email ||
      !user.first_name ||
      !user.last_name
    )
      return;
    const result = await registerAction(user);
    if (result.message === "Register Success") {
      swalFire("Success", result.message, "success").then((result: any) => {
        if (result.isDismissed) {
          navigate("/login");
        }
      });
    }
    if (
      result.response.data ===
      "Something Went Wrong ! Please Try Another User Name"
    ) {
      setUserInUse(true);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className={styles.container}>
        <CssBaseline />
        <Box className={styles.box}>
          <Avatar className={styles.avatar}>
            <LockOutlinedIcon className={styles.logo} />
          </Avatar>
          <Typography component="h1" variant="h5" className={styles.header}>
            Sign up
          </Typography>
          <Box component="form" noValidate={false} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ input: { color: "#fff" } }}
                  InputLabelProps={{
                    style: {
                      color: "#fff",
                    },
                  }}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  className={styles.textField}
                  onChange={(e) =>
                    setUser({ ...user, first_name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ input: { color: "#fff" } }}
                  InputLabelProps={{
                    style: {
                      color: "#fff",
                    },
                  }}
                  className={styles.textField}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) =>
                    setUser({ ...user, last_name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{
                    style: {
                      color: "#fff",
                    },
                  }}
                  sx={{ input: { color: "#fff" } }}
                  className={styles.textField}
                  required
                  error={!validateEmail(user.email) && user.email.length > 1}
                  helperText={`${
                    !validateEmail(user.email) && user.email.length > 1
                      ? "Please Fill Correct Email"
                      : ""
                  }`}
                  fullWidth
                  id="email"
                  label="Email Address"
                  FormHelperTextProps={{ style: { fontSize: "large" } }}
                  name="email"
                  autoComplete="email"
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{
                    style: {
                      color: "#fff",
                    },
                  }}
                  FormHelperTextProps={{ style: { fontSize: "large" } }}
                  className={styles.textField}
                  sx={{ input: { color: "#fff" } }}
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  error={userInUse}
                  helperText={`${
                    userInUse && user.user_name.length > 1
                      ? "Please use other User-Name"
                      : ""
                  }`}
                  autoComplete="username"
                  onChange={(e) =>
                    setUser({ ...user, user_name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{
                    style: {
                      color: "#fff",
                    },
                  }}
                  sx={{ input: { color: "#fff" } }}
                  className={styles.textField}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              className={styles.button}
              onClick={registerHandler}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="/login"
                  variant="body2"
                  sx={{ color: "#87ceeb", fontSize: "larger" }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
