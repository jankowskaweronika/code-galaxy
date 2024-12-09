import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authContext';
import { AuthError, RegisterFormData } from '../auth/types';

export const useRegister = () => {
    const navigate = useNavigate();
    const { signUp, signInWithGoogle } = useAuth();

    const [formData, setFormData] = useState<RegisterFormData>({
        email: '',
        password: '',
        confirmPassword: '',
        displayName: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setError('');

        try {
            await signUp(formData.email, formData.password, formData.displayName);
            navigate('/dashboard');
        } catch (err) {
            setError((err as AuthError).message);
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
            setError((err as AuthError).message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        error,
        setError,
        isLoading,
        handleChange,
        handleRegister,
        handleGoogleRegister
    };
};
