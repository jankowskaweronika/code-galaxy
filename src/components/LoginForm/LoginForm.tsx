import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button, TextField, Typography, Box, Divider, Link,
    Alert, Snackbar
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

type LoginFormProps = {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    error: string;
    setError: (error: string) => void;
    successMessage: string;
    setSuccessMessage: (message: string) => void;
    isLoading: boolean;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    onGoogleLogin: () => Promise<void>;
    onForgotPassword: () => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    successMessage,
    setSuccessMessage,
    isLoading,
    onSubmit,
    onGoogleLogin,
    onForgotPassword
}) => {
    const navigate = useNavigate();

    return (
        <>
            <Typography component="h1" variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
                Zaloguj się
            </Typography>

            <Box component="form" onSubmit={onSubmit} sx={{ width: '100%' }}>
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
                    onClick={onForgotPassword}
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
                    onClick={onGoogleLogin}
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

            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
                <Alert severity="error" onClose={() => setError('')}>{error}</Alert>
            </Snackbar>

            <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
                <Alert severity="success" onClose={() => setSuccessMessage('')}>{successMessage}</Alert>
            </Snackbar>
        </>
    );
};

export default LoginForm