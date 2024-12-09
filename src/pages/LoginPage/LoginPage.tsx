import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import {
    Button, TextField, Typography, Box, Divider, Link,
    Alert, Snackbar
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useLogin } from '../../hooks/useLogin';

const LoginPage: React.FC = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        error,
        setError,
        successMessage,
        setSuccessMessage,
        isLoading,
        handleLogin,
        handleGoogleLogin,
        handleForgotPassword
    } = useLogin();

    const navigate = useNavigate();

    return (
        <AuthLayout>
            <Typography component="h1" variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
                Zaloguj się
            </Typography>

            <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
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
                    disabled={isLoading}
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
                    disabled={isLoading}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                    disabled={isLoading}
                >
                    {isLoading ? 'Logowanie...' : 'Zaloguj się'}
                </Button>

                <Link
                    component="button"
                    variant="body2"
                    onClick={handleForgotPassword}
                    sx={{ display: 'block', textAlign: 'center', mb: 2 }}
                    disabled={isLoading}
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
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    sx={{ mb: 2 }}
                >
                    Zaloguj przez Google
                </Button>

                <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
                    Nie masz konta?{' '}
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => navigate('/register')}
                        disabled={isLoading}
                    >
                        Zarejestruj się
                    </Link>
                </Typography>
            </Box>

            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError('')}
            >
                <Alert severity="error" onClose={() => setError('')}>
                    {error}
                </Alert>
            </Snackbar>

            <Snackbar
                open={!!successMessage}
                autoHideDuration={6000}
                onClose={() => setSuccessMessage('')}
            >
                <Alert severity="success" onClose={() => setSuccessMessage('')}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </AuthLayout>
    );
};

export default LoginPage;