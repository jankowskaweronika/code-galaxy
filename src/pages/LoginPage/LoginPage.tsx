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
    Snackbar
} from '@mui/material';
import { PageLayout } from '../../layouts/PageLayout';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

type AuthError = {
    code: string;
    message: string;
}

const LoginPage = () => {
    const navigate = useNavigate();
    const { signInWithEmail, signInWithGoogle, signInWithFacebook, resetPassword } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await signInWithEmail(email, password);
            navigate('/dashboard');
        } catch (err) {
            const authError = err as AuthError;
            setError(authError.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (provider: 'google' | 'facebook') => {
        setIsLoading(true);
        setError('');

        try {
            if (provider === 'google') {
                await signInWithGoogle();
            } else {
                await signInWithFacebook();
            }
            navigate('/dashboard');
        } catch (err) {
            const authError = err as AuthError;
            setError(authError.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setError('Wprowadź adres email, aby zresetować hasło');
            return;
        }

        try {
            await resetPassword(email);
            setSuccessMessage('Link do resetowania hasła został wysłany na podany adres email');
        } catch (err) {
            const authError = err as AuthError;
            setError(authError.message);
        }
    };

    return (
        <PageLayout>
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
                            disabled={isLoading} />
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
                            disabled={isLoading} />

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
                            sx={{ mb: 2 }}
                            onClick={() => handleSocialLogin('google')}
                            disabled={isLoading}
                        >
                            Zaloguj przez Google
                        </Button>

                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<FacebookIcon />}
                            sx={{ mb: 2 }}
                            onClick={() => handleSocialLogin('facebook')}
                            disabled={isLoading}
                        >
                            Zaloguj przez Facebook
                        </Button>

                        <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
                            Nie masz konta?{' '}
                            <Link
                                component="button"
                                variant="body2"
                                onClick={() => navigate('/register')}
                                sx={{ ml: 1 }}
                                disabled={isLoading}
                            >
                                Zarejestruj się
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

                <Snackbar
                    open={!!successMessage}
                    autoHideDuration={6000}
                    onClose={() => setSuccessMessage('')}
                >
                    <Alert severity="success" onClose={() => setSuccessMessage('')}>
                        {successMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </PageLayout>
    );
};

export default LoginPage;