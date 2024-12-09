import React from 'react';
import { Box, Drawer } from '@mui/material';
import { DashboardMenuItem } from '../components/DashboardUserMenu/DasboardUserMenu';
import { PageLayout } from './PageLayout';

type DashboardLayoutProps = {
    children: React.ReactNode;
    menuItems: DashboardMenuItem[];
    drawer: React.ReactNode;
}

const DRAWER_WIDTH = 240;

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
    drawer
}) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    return (
        <PageLayout>
            <Box sx={{ display: 'flex', minHeight: '100vh', pt: '64px' }}>
                <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
                    {/* Mobile drawer */}
                    <Drawer
                        variant="temporary"
                        anchor="left"
                        open={mobileOpen}
                        onClose={() => setMobileOpen(false)}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box', mt: '64px' },
                        }}
                    >
                        {drawer}
                    </Drawer>

                    {/* Desktop drawer */}
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box', mt: '64px' },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` }
                    }}
                >
                    {children}
                </Box>
            </Box>
        </PageLayout>
    );
};