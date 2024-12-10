import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

type DashboardAppBarProps = {
    onMenuClick: () => void;
    title: string;
    drawerWidth: number;
}

const DashboardAppBar: React.FC<DashboardAppBarProps> = ({
    onMenuClick,
    title,
    drawerWidth
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <AppBar
            position="fixed"
            sx={{
                width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
                ml: isMobile ? 0 : drawerWidth
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={onMenuClick}
                    sx={{ mr: 2, display: isMobile ? 'block' : 'none' }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default DashboardAppBar