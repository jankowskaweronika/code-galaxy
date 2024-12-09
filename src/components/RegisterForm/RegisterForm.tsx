import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button, TextField, Typography, Box, Divider, Link,
    Alert, Snackbar
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

interface RegisterFormProps {
    formData: {
        email: string;
        password: string;
        confirmPassword: string;
        displayName: string;
    };
    error: string;
    setError: (error: string) => void;
    isLoading: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    onGoogleRegister: () => Promise<void>;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
    formData,
    error,
    setError,
    isLoading,
    onChange,
    onSubmit,
    onGoogleRegister
}) => {
    const navigate = useNavigate();

    return (
        <>
            <Typography component="h1" variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
                Zarejestruj się
            </Typography>

            <Box component="form" onSubmit={onSubmit} sx={{ width: '100%' }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="displayName"
                    label="Imię i nazwisko"
                    value={formData.displayName}
                    onChange={onChange}
                    disabled={isLoading}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Adres Email"
                    type="email"
                    value={formData.email}
                    onChange={onChange}
                    disabled={isLoading}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Hasło"
                    type="password"
                    value={formData.password}
                    onChange={onChange}
                    disabled={isLoading}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Potwierdź hasło"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={onChange}
                    disabled={isLoading}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                    disabled={isLoading}
                >
                    {isLoading ? 'Rejestracja...' : 'Zarejestruj się'}
                </Button>

                <Divider sx={{ my: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                        lub
                    </Typography>
                </Divider>

                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    onClick={onGoogleRegister}
                    disabled={isLoading}
                    sx={{ mb: 2 }}
                >
                    Zarejestruj przez Google
                </Button>

                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                    Masz już konto?{' '}
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => navigate('/login')}
                        disabled={isLoading}
                    >
                        Zaloguj się
                    </Link>
                </Typography>
            </Box>

            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
                <Alert severity="error" onClose={() => setError('')}>{error}</Alert>
            </Snackbar>
        </>
    );
};