import React from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import { useAuth } from '../../auth/authContext';
import DashboardUserLayout from '../../layouts/DasboardUserLayout';
import DashboardNavigation from '../../components/DashboardNavigation/DashboardNavigation';

const DashboardUserProfile: React.FC = () => {
    const { user } = useAuth();

    const getWelcomeMessage = (): string => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Dzień dobry';
        if (hour < 18) return 'Witaj';
        return 'Dobry wieczór';
    };

    const getInitial = (name: string | null | undefined): string => {
        if (!name) return 'U';
        return name.charAt(0).toUpperCase();
    };

    const getFirstName = (fullName: string | null | undefined): string => {
        if (!fullName) return 'Użytkowniku';
        const firstName = fullName.split(' ')[0];
        return firstName || 'Użytkowniku';
    };

    return (
        <DashboardUserLayout
            drawer={<DashboardNavigation />}
            title="Twój profil"
        >
            <Box sx={{ maxWidth: 'md', mx: 'auto', p: 3 }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 3
                    }}
                >
                    <Avatar
                        sx={{
                            width: 120,
                            height: 120,
                            bgcolor: 'primary.main',
                            fontSize: '3rem'
                        }}
                    >
                        {getInitial(user?.displayName)}
                    </Avatar>

                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            {getWelcomeMessage()}, {getFirstName(user?.displayName)}!
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Miło Cię znowu widzieć w CodeGalaxy
                        </Typography>
                    </Box>

                    <Box sx={{ width: '100%', mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Twoje dane:
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 3 }}>
                            <Box sx={{ display: 'grid', gap: 2 }}>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Imię i nazwisko
                                    </Typography>
                                    <Typography variant="body1">
                                        {user?.displayName || 'Nie podano'}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Email
                                    </Typography>
                                    <Typography variant="body1">
                                        {user?.email || 'Nie podano'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </Paper>
            </Box>
        </DashboardUserLayout>
    );
};

export default DashboardUserProfile;