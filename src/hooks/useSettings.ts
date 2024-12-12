import { useState } from 'react';
import { useAuth } from '../auth/authContext';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { auth } from '../config/firebase.config';

type SettingsFormData = {
    displayName: string;
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

type SettingsError = {
    displayName?: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
};

export const useSettings = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [formData, setFormData] = useState<SettingsFormData>({
        displayName: user?.displayName || '',
        email: user?.email || '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const validateForm = (): SettingsError | null => {
        const errors: SettingsError = {};

        if (!formData.displayName.trim()) {
            errors.displayName = 'Imię i nazwisko jest wymagane';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email jest wymagany';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            errors.email = 'Nieprawidłowy format email';
        }

        if (formData.newPassword) {
            if (!formData.currentPassword) {
                errors.currentPassword = 'Aktualne hasło jest wymagane do zmiany hasła';
            }
            if (formData.newPassword.length < 6) {
                errors.newPassword = 'Nowe hasło musi mieć minimum 6 znaków';
            }
            if (formData.newPassword !== formData.confirmNewPassword) {
                errors.confirmNewPassword = 'Hasła nie są identyczne';
            }
        }

        return Object.keys(errors).length > 0 ? errors : null;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateForm();
        
        if (validationErrors) {
            setError('Proszę poprawić błędy w formularzu');
            return;
        }

        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            if (!auth.currentUser) throw new Error('Użytkownik nie jest zalogowany');

            // Aktualizacja profilu
            if (formData.displayName !== user?.displayName) {
                await updateProfile(auth.currentUser, {
                    displayName: formData.displayName
                });
            }

            // Aktualizacja emaila
            if (formData.email !== user?.email) {
                await updateEmail(auth.currentUser, formData.email);
            }

            // Aktualizacja hasła
            if (formData.newPassword) {
                await updatePassword(auth.currentUser, formData.newPassword);
                setFormData(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                }));
            }

            setSuccessMessage('Ustawienia zostały zaktualizowane');
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        isLoading,
        error,
        successMessage,
        handleChange,
        handleSubmit,
        setError,
        setSuccessMessage
    };
};