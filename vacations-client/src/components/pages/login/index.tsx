import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { HandshakeRounded, LocationSearchingOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { IUserLogin, loginAction } from '../../../store/asyncFunction/login';
import { getTokenLS } from '../../../store/ls';
import { useNavigate } from 'react-router-dom';
import MyModal from '../../ui-components/modal';


const theme = createTheme();

export default function LoginPage() {
    const [user_name, setUser_Name] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({ user_name: user_name, password: password });
    let navigate = useNavigate();
    useEffect(() => {
        const isTokenExists = getTokenLS();
        if (isTokenExists) {
            navigate("/");
        }
    }, [])
    useEffect(() => {
        if (!user.user_name || !user.password) return
        loginAction(user)
        setTimeout(() => { navigate("/") }, 2000);

    }, [user])
    function loginHandler() {
        setUser({ user_name: user_name, password: password });
    }




    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            onChange={(e) => setUser_Name(e.target.value)}

                            margin="normal"
                            required
                            fullWidth
                            id="userName"
                            label="User Name"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            onChange={(e) => setPassword(e.target.value)}
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
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>

    );
}