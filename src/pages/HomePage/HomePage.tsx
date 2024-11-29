import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigation } from '../../hooks/useNavigation';
import { Container, Typography, Box, Button } from '@mui/material';
import UserPage from '../UserPage/UserPage';

const HomePage: React.FC = () => {
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
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '2rem',
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        variant="h2"
                        component="h1"
                        gutterBottom
                        sx={{ fontWeight: 'bold' }}
                    >
                        Witaj na platformie kursów programowania!
                    </Typography>
                    <Typography
                        variant="h5"
                        component="p"
                        gutterBottom
                        sx={{ marginBottom: '1.5rem', color: 'text.secondary' }}
                    >
                        Odkryj najlepsze kursy, rozwijaj swoje umiejętności i zostań mistrzem kodowania.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        href="/courses"
                        sx={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
                    >
                        Zobacz kursy
                    </Button>
                    <UserPage />
                </Container>
            </Box>
        </>
    );
};

export default HomePage;
