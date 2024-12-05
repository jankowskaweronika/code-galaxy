import React from 'react';
import { Box, Container } from '@mui/material';
import Navbar from '../components/Navbar/Navbar';
import { useNavigation } from '../hooks/useNavigation';

type PageLayoutProps = {
    children: React.ReactNode;
    centered?: boolean;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    padding?: number;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
    children,
    centered = false,
    maxWidth = 'lg',
    padding = 2
}) => {
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
                    ...(centered && {
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                    }),
                    padding: padding,
                }}
            >
                <Container maxWidth={maxWidth}>
                    {children}
                </Container>
            </Box>
        </>
    );
};