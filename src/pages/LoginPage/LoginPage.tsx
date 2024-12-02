import React, { useState } from 'react';
import {
    Button,
    TextField,
    Container,
    Typography,
    Paper,
    Box,
    Divider,
    Link
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Logika logowania
        console.log('Login attempt', { email, password });
    };

    const handleGoogleLogin = () => {
        // Logika logowania przez Google
        console.log('Google Login');
    };

    const handleFacebookLogin = () => {
        // Logika logowania przez Facebook
        console.log('Facebook Login');
    };

    const handleForgotPassword = () => {
        // Przekierowanie do strony resetowania hasła
        console.log('Forgot Password');
    };

    const handleRegister = () => {
        // Przekierowanie do strony rejestracji
        console.log('Navigate to Registration');
    };

    return (
        <Container maxWidth="xs">
            <Paper
                elevation={3}
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 3
                }}
            >
                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                    Zaloguj się
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ width: '100%' }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Adres Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Hasło"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                    >
                        Zaloguj się
                    </Button>

                    <Link
                        component="button"
                        variant="body2"
                        onClick={handleForgotPassword}
                        sx={{ display: 'block', textAlign: 'center', mb: 2 }}
                    >
                        Zapomniałeś hasła?
                    </Link>

                    <Divider sx={{ my: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                            lub
                        </Typography>
                    </Divider>

                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        sx={{ mb: 2 }}
                        onClick={handleGoogleLogin}
                    >
                        Zaloguj przez Google
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<FacebookIcon />}
                        sx={{ mb: 2 }}
                        onClick={handleFacebookLogin}
                    >
                        Zaloguj przez Facebook
                    </Button>

                    <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
                        Nie masz konta?
                        <Link
                            component="button"
                            variant="body2"
                            onClick={handleRegister}
                            sx={{ ml: 1 }}
                        >
                            Zarejestruj się
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;