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
    const initialState: IUserLogin = { user_name: "", password: "" };
    const [user, setUser] = useState(initialState);
    const [isOpen, setIsOpen] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        const isTokenExists = getTokenLS();
        if (isTokenExists) {
            setIsOpen(true);
            setTimeout(() => { navigate("/") }, 5000);
        }
        if (!user.password || !user.user_name) return
        async function loginHandler() {
            const result = await loginAction(user);
            if (result) {
                return navigate("/");
            }
        }

        loginHandler()
    }, [user])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const dUser = { user_name: data.get("username")?.toString(), password: data.get("password")?.toString() };
        if (!dUser.user_name || !dUser.password) return alert("Please fill all the fields");
        setUser(dUser);
    };

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
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
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
                            type="submit"
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
            <MyModal isOpen={isOpen} />
        </ThemeProvider>

    );
}