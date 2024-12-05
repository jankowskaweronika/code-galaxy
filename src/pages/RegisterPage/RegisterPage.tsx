import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/authContext';
import {
    Button,
    TextField,
    Container,
    Typography,
    Paper,
    Box,
    Divider,
    Link,
    Alert,
    Snackbar,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { PageLayout } from '../../layouts/PageLayout';

type AuthError = {
    code: string;
    message: string;
}

const RegisterPage = () => {
    const navigate = useNavigate();
    const { signUp, signInWithGoogle } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        displayName: ''
    });
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.email || !formData.password || !formData.confirmPassword || !formData.displayName) {
            setError('Wszystkie pola są wymagane');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Hasła nie są identyczne');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Hasło musi mieć minimum 6 znaków');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setError('');

        try {
            await signUp(formData.email, formData.password, formData.displayName);
            navigate('/dashboard');
        } catch (err) {
            const authError = err as AuthError;
            setError(authError.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleRegister = async () => {
        setIsLoading(true);
        setError('');

        try {
            await signInWithGoogle();
            navigate('/dashboard');
        } catch (err) {
            const authError = err as AuthError;
            setError(authError.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageLayout>
            <Container maxWidth="xs">
                <Paper elevation={3} sx={{ mt: 8, p: 3 }}>
                    <Typography component="h1" variant="h5" textAlign="center" gutterBottom>
                        Zarejestruj się
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit}>
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

                        <Typography variant="body2" textAlign="center">
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
                </Paper>

                <Snackbar
                    open={!!error}
                    autoHideDuration={6000}
                    onClose={() => setError('')}
                >
                    <Alert severity="error" onClose={() => setError('')}>
                        {error}
                    </Alert>
                </Snackbar>
            </Container>
        </PageLayout>
    );
};

export default RegisterPage;