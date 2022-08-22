import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import { loginAction } from '../../../store/asyncFunction/login';
import { getTokenLS } from '../../../store/ls';
import { useNavigate } from 'react-router-dom';
import { swalFire } from '../../helpers';


const theme = createTheme();

export default function LoginPage() {
    const [user, setUser] = useState({ user_name: "", password: "" });
    let navigate = useNavigate();
    useEffect(() => {
        const isTokenExists = getTokenLS();
        if (isTokenExists) {
            navigate("/");
        }
    }, [])
 
    async function loginHandler() {
        if (!user.user_name || !user.password) return
       const result = await loginAction(user)
       console.log(result)
       if(result.message === "Login Success"){
        swalFire("Success",result.message,"success").then((result:any) => {
            console.log(result)
            if(result.isDismissed){
              navigate("/vacations");
            }
          }) 
    }}
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xl" sx={{height:"100%",mt:5}}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 0,
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
                            onChange={(e) => setUser({...user, user_name: e.target.value})}

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
                            onChange={(e) => setUser({...user, password: e.target.value})}
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
                                <Link href="/register" variant="body2">
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