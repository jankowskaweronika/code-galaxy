import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import DashboardAppBar from '../components/DasboardAppBar/DasboardAppBar';
import DashboardDrawer from '../components/DasboardDrawer/DasboardDrawer';
import DashboardContent from '../components/DasboardContent/DasboardContent';

type DashboardLayoutProps = {
    children: React.ReactNode;
    drawer: React.ReactNode;
    title?: string;
}

const DRAWER_WIDTH = 240;

const DashboardUserLayout: React.FC<DashboardLayoutProps> = ({
    children,
    drawer,
    title = 'Profil użytkownika'
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <DashboardAppBar
                onMenuClick={handleDrawerToggle}
                title={title}
                drawerWidth={DRAWER_WIDTH}
            />

            <Box
                component="nav"
                sx={{
                    width: isMobile ? 0 : DRAWER_WIDTH,
                    flexShrink: { md: 0 }
                }}
            >
                {/* Mobile drawer */}
                {isMobile && (
                    <DashboardDrawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        drawerWidth={DRAWER_WIDTH}
                    >
                        {drawer}
                    </DashboardDrawer>
                )}

                {/* Desktop drawer */}
                {!isMobile && (
                    <DashboardDrawer
                        variant="permanent"
                        open={true}
                        onClose={() => { }}
                        drawerWidth={DRAWER_WIDTH}
                    >
                        {drawer}
                    </DashboardDrawer>
                )}
            </Box>

            <DashboardContent drawerWidth={DRAWER_WIDTH}>
                {children}
            </DashboardContent>
        </Box>
    );
};

export default DashboardUserLayout