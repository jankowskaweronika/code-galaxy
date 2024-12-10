import React from 'react';
import { Box } from '@mui/material';
import { useNavigation } from '../hooks/useNavigation';

import Navbar from '../components/Navbar/Navbar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isDrawerOpen, handleDrawerToggle, handleDrawerClose } = useNavigation();

    return (
        <>
            <Navbar
                isDrawerOpen={isDrawerOpen}
                onDrawerToggle={handleDrawerToggle}
                onDrawerClose={handleDrawerClose}
            />
            <Box sx={{ mt: '64px', maxHeight: 'calc(100vh - 64px)' }}>
                {children}
            </Box>
        </>
    );
};

export default MainLayout