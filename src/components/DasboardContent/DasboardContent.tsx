import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';

interface DashboardContentProps {
    children: React.ReactNode;
    drawerWidth: number;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
    children,
    drawerWidth
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 3,
                width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
                mt: '64px'
            }}
        >
            {children}
        </Box>
    );
};

export default DashboardContent