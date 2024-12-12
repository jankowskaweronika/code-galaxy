import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Alert,
    Snackbar,
    Paper,
} from '@mui/material';
import { PageLayout } from '../../layouts/PageLayout';
import SectionHeader from '../../components/SectionHeader/SectionHeader';

type ContactFormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
}

type FormErrors = {
    [K in keyof ContactFormData]?: string;
}

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        show: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({
        show: false,
        message: '',
        severity: 'success'
    });

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = 'Imię jest wymagane';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email jest wymagany';
            isValid = false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            newErrors.email = 'Nieprawidłowy adres email';
            isValid = false;
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Temat jest wymagany';
            isValid = false;
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Wiadomość jest wymagana';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Tutaj możesz dodać logikę wysyłania wiadomości
            // np. poprzez API lub Firebase
            await new Promise(resolve => setTimeout(resolve, 1000)); // Symulacja wysyłania

            setSubmitStatus({
                show: true,
                message: 'Wiadomość została wysłana. Dziękujemy za kontakt!',
                severity: 'success'
            });

            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            setSubmitStatus({
                show: true,
                message: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.',
                severity: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Czyść błąd dla pola, które jest modyfikowane
        if (errors[name as keyof ContactFormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    return (
        <PageLayout maxWidth="sm">
            <SectionHeader
                title="Skontaktuj się z nami"
                subtitle="Masz pytania? Chętnie na nie odpowiemy!"
            />

            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    <TextField
                        required
                        fullWidth
                        label="Imię i nazwisko"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        disabled={isSubmitting}
                    />

                    <TextField
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        disabled={isSubmitting}
                    />

                    <TextField
                        required
                        fullWidth
                        label="Temat"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        error={!!errors.subject}
                        helperText={errors.subject}
                        disabled={isSubmitting}
                    />

                    <TextField
                        required
                        fullWidth
                        label="Wiadomość"
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        error={!!errors.message}
                        helperText={errors.message}
                        disabled={isSubmitting}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isSubmitting}
                        sx={{ mt: 2 }}
                    >
                        {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                    </Button>
                </Box>
            </Paper>

            <Snackbar
                open={submitStatus.show}
                autoHideDuration={6000}
                onClose={() => setSubmitStatus(prev => ({ ...prev, show: false }))}
            >
                <Alert
                    severity={submitStatus.severity}
                    onClose={() => setSubmitStatus(prev => ({ ...prev, show: false }))}
                >
                    {submitStatus.message}
                </Alert>
            </Snackbar>
        </PageLayout>
    );
};

export default ContactPage;