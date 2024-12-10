import React from 'react';
import { Container, Typography, Box, Paper, Avatar, Button, Stack } from '@mui/material';
import { Person } from '@mui/icons-material';
import DashboardLayout from '../../layouts/DasboardUserLayout';
import DashboardNavigation from '../../components/DashboardNavigation/DashboardNavigation';
import { useAuth } from '../../auth/authContext';


const DashboardUserPage: React.FC = () => {
    const { user } = useAuth();

    return (
        <DashboardLayout
            drawer={<DashboardNavigation />}
            title={`Witaj, ${user?.displayName || 'Użytkowniku'}`}
        >
            <Container maxWidth="md">
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ width: 100, height: 100, mb: 2 }}>
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt={user.displayName || ''} />
                            ) : (
                                <Person sx={{ fontSize: 60 }} />
                            )}
                        </Avatar>

                        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Cześć, {user?.displayName || 'Użytkowniku'}!
                        </Typography>

                        <Typography variant="subtitle1" color="text.secondary">
                            Twój poziom zaawansowania: Średniozaawansowany
                        </Typography>
                    </Box>
                </Paper>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 4 }}>
                    {[
                        { title: 'Aktywne kursy', value: '3' },
                        { title: 'Ukończone kursy', value: '7' },
                        { title: 'Całkowity postęp', value: '62%' }
                    ].map((item) => (
                        <Paper
                            key={item.title}
                            elevation={2}
                            sx={{
                                p: 3,
                                textAlign: 'center',
                                borderRadius: 2,
                                flex: 1,
                                minWidth: 0
                            }}
                        >
                            <Typography variant="h6" gutterBottom>{item.title}</Typography>
                            <Typography variant="h4" color="primary">{item.value}</Typography>
                        </Paper>
                    ))}
                </Stack>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        href="/courses"
                        sx={{ py: 1.5, px: 4, fontSize: '1rem' }}
                    >
                        Kontynuuj naukę
                    </Button>
                </Box>
            </Container>
        </DashboardLayout>
    );
};

export default DashboardUserPage;