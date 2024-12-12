import React from 'react';
import { Box, Container, Paper } from '@mui/material';
import Navbar from '../components/Navbar/Navbar';
import { useNavigation } from '../hooks/useNavigation';

type AuthLayoutProps = {
    children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
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
                    padding: 2,
                }}
            >
                <Container maxWidth="xs">
                    <Paper
                        elevation={3}
                        sx={{
                            width: '100%',
                            padding: 3,
                            mt: { xs: 2, sm: 8 }
                        }}
                    >
                        {children}
                    </Paper>
                </Container>
            </Box>
        </>
    );
};

export default AuthLayout;