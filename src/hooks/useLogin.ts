import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authContext';

export const useLogin = () => {
    const navigate = useNavigate();
    const { signInWithEmail, signInWithGoogle, resetPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await signInWithEmail(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError('');

        try {
            await signInWithGoogle();
            navigate('/dashboard');
        } catch (err) {
            setError((err as Error).message);
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
            setError((err as Error).message);
        }
    };

    return {
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
    };
};