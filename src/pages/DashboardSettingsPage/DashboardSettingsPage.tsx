import React from 'react';
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Divider,
    Alert,
    Snackbar
} from '@mui/material';
import DashboardUserLayout from '../../layouts/DasboardUserLayout';
import DashboardNavigation from '../../components/DashboardNavigation/DashboardNavigation';
import { useSettings } from '../../hooks/useSettings';

const SettingsPage: React.FC = () => {
    const {
        formData,
        isLoading,
        error,
        successMessage,
        handleChange,
        handleSubmit,
        setError,
        setSuccessMessage
    } = useSettings();

    return (
        <DashboardUserLayout
            drawer={<DashboardNavigation />}
            title="Ustawienia"
        >
            <Box sx={{ maxWidth: 'md', mx: 'auto', p: 3 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Ustawienia konta
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Dane podstawowe
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Imię i nazwisko"
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isLoading}
                        />

                        <Divider sx={{ my: 4 }} />

                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Zmiana hasła
                        </Typography>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Aktualne hasło"
                            name="currentPassword"
                            type="password"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Nowe hasło"
                            name="newPassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Potwierdź nowe hasło"
                            name="confirmNewPassword"
                            type="password"
                            value={formData.confirmNewPassword}
                            onChange={handleChange}
                            disabled={isLoading}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3 }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Zapisywanie...' : 'Zapisz zmiany'}
                        </Button>
                    </Box>
                </Paper>
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
        </DashboardUserLayout>
    );
};

export default SettingsPage;