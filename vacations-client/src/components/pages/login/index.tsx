import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Avatar } from "@mui/material";
import { loginAction } from "../../../store/asyncFunction/login";
import { getTokenLS } from "../../../store/ls";
import { useNavigate } from "react-router-dom";
import { swalFire } from "../../helpers";
import styles from "./login.module.css";

export default function LoginPage() {
  const [user, setUser] = useState({ user_name: "", password: "" });
  let navigate = useNavigate();
  useEffect(() => {
    const isTokenExists = getTokenLS();
    if (isTokenExists) {
      navigate("/");
    }
  });

  async function loginHandler() {
    if (!user.user_name || !user.password) return;
    try {
      const result = await loginAction(user);
      if (result?.message === "Login Success") {
        swalFire("Success", result.message, "success").then((result: any) => {
          if (result.isDismissed) {
            navigate("/vacations");
          }
        });
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        swalFire("Failed", "Please Contact Admin", "error");
      }
    }
  }

  return (
    <Container component="main" maxWidth="xl" className={styles.container}>
      <CssBaseline />
      <Box className={styles.box}>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon color="inherit" className={styles.logo} />
        </Avatar>
        <Typography className={styles.header} component="h5" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            InputLabelProps={{
              style: {
                color: "#fff",
              },
            }}
            sx={{
              border: "none",
              "& fieldset": { border: "none" },
              input: { color: "#fff" },
            }}
            className={styles.textField}
            onChange={(e) => setUser({ ...user, user_name: e.target.value })}
            margin="normal"
            required
            fullWidth
            id="userName"
            label="User Name"
            name="username"
            autoComplete="username"
          />
          <TextField
            InputLabelProps={{ style: { color: "#fff" } }}
            sx={{
              border: "none",
              "& fieldset": { border: "none" },
              input: { color: "#fff" },
            }}
            className={styles.textField}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            onClick={loginHandler}
            type="button"
            fullWidth
            variant="contained"
            className={styles.button}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link
                href="/register"
                variant="body2"
                sx={{ color: "#fff", fontSize: "larger" }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
