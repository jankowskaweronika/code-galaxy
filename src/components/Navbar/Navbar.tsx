import { AppBar, Toolbar, Box, IconButton, styled } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { SxProps, Theme } from "@mui/material";

import DesktopMenu from '../DesktopMenu/DesktopMenu';
import MobileMenu from '../MobileMenu/MobileMenu';

import logo from '../../assets/logo.png';

export type MenuItemType = {
    text: string;
    to: string;
};

export type NavbarProps = {
    logoSrc?: string;
    logoHeight?: number;
    menuItems?: MenuItemType[];
    containerStyles?: SxProps<Theme>;
    menuItemStyles?: {
        color?: string | ((theme: Theme) => string);
        hoverColor?: string | ((theme: Theme) => string);
        backgroundColor?: string | ((theme: Theme) => string);
        hoverBackgroundColor?: string | ((theme: Theme) => string);
    };
    isDrawerOpen: boolean;
    onDrawerToggle: () => void;
    onDrawerClose: () => void;
};

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
});

export const defaultProps = {
    logoHeight: 30,
    menuItems: [
        { text: 'O nas', to: '/about' },
        { text: 'Kontakt', to: '/contact' },
        { text: 'Kursy', to: '/courses' },
    ],
};

const Navbar: React.FC<NavbarProps> = ({
    logoSrc = logo,
    logoHeight = defaultProps.logoHeight,
    menuItems = defaultProps.menuItems,
    containerStyles,
    menuItemStyles,
    isDrawerOpen,
    onDrawerToggle,
    onDrawerClose,
}) => (
    <AppBar
        component="nav"
        position="absolute"
        sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            ...containerStyles,
        }}
        elevation={0}
    >
        <StyledToolbar>
            <Box
                component="img"
                src={logoSrc}
                sx={{
                    height: logoHeight,
                }}
            />

            <DesktopMenu
                menuItems={menuItems}
                menuItemStyles={menuItemStyles}
            />

            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={onDrawerToggle}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    ml: 'auto',
                }}
            >
                <MenuIcon />
            </IconButton>
        </StyledToolbar>

        <MobileMenu
            isOpen={isDrawerOpen}
            onClose={onDrawerClose}
            menuItems={menuItems}
            menuItemStyles={menuItemStyles}
        />
    </AppBar>
);

export default Navbar