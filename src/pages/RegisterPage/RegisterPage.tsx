import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import {
    Button, TextField, Typography, Box, Divider, Link,
    Alert, Snackbar
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useRegister } from '../../hooks/useRegister';

const RegisterPage: React.FC = () => {
    const {
        formData,
        error,
        setError,
        isLoading,
        handleChange,
        handleRegister,
        handleGoogleRegister
    } = useRegister();

    const navigate = useNavigate();

    return (
        <AuthLayout>
            <Typography component="h1" variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
                Zarejestruj się
            </Typography>

            <Box component="form" onSubmit={handleRegister} sx={{ width: '100%' }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="displayName"
                    label="Imię i nazwisko"
                    value={formData.displayName}
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onClick={handleGoogleRegister}
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

            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError('')}
            >
                <Alert severity="error" onClose={() => setError('')}>
                    {error}
                </Alert>
            </Snackbar>
        </AuthLayout>
    );
};

export default RegisterPage;