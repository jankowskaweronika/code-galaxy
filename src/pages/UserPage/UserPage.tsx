import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigation } from '../../hooks/useNavigation';
import { Container, Typography, Box, Paper, Avatar, Button, Stack } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

const UserPage: React.FC = () => {
    const { isDrawerOpen, handleDrawerToggle, handleDrawerClose } = useNavigation();

    return (
        <>
            <Navbar
                isDrawerOpen={isDrawerOpen}
                onDrawerToggle={handleDrawerToggle}
                onDrawerClose={handleDrawerClose}
            />
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: '2rem',
                }}
            >
                <Container maxWidth="md">
                    <Paper
                        elevation={3}
                        sx={{
                            padding: '2rem',
                            borderRadius: '12px',
                            width: '100%',
                            marginBottom: '2rem'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 100,
                                    height: 100,
                                    marginBottom: '1rem'
                                }}
                            >
                                <PersonIcon sx={{ fontSize: 60 }} />
                            </Avatar>

                            <Typography
                                variant="h4"
                                component="h1"
                                gutterBottom
                                sx={{ fontWeight: 'bold' }}
                            >
                                Cześć, Jan Kowalski!
                            </Typography>

                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                gutterBottom
                            >
                                Twój poziom zaawansowania: Średniozaawansowany
                            </Typography>
                        </Box>
                    </Paper>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={3}
                        sx={{
                            width: '100%',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Paper
                            elevation={2}
                            sx={{
                                padding: '1.5rem',
                                textAlign: 'center',
                                borderRadius: '12px',
                                flex: 1,
                                minWidth: 0
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Aktywne kursy
                            </Typography>
                            <Typography variant="h4" color="primary">
                                3
                            </Typography>
                        </Paper>

                        <Paper
                            elevation={2}
                            sx={{
                                padding: '1.5rem',
                                textAlign: 'center',
                                borderRadius: '12px',
                                flex: 1,
                                minWidth: 0
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Ukończone kursy
                            </Typography>
                            <Typography variant="h4" color="primary">
                                7
                            </Typography>
                        </Paper>

                        <Paper
                            elevation={2}
                            sx={{
                                padding: '1.5rem',
                                textAlign: 'center',
                                borderRadius: '12px',
                                flex: 1,
                                minWidth: 0
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Całkowity postęp
                            </Typography>
                            <Typography variant="h4" color="primary">
                                62%
                            </Typography>
                        </Paper>
                    </Stack>

                    <Box
                        sx={{
                            marginTop: '2rem',
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            href="/courses"
                            sx={{
                                padding: '0.75rem 2rem',
                                fontSize: '1rem'
                            }}
                        >
                            Kontynuuj naukę
                        </Button>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default UserPage;