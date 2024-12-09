import React from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { SxProps, Theme } from "@mui/material";
import logo from '../../assets/logo.png';

export interface MenuItemType {
    text: string;
    to: string;
    isButton?: boolean;
    buttonProps?: {
        variant?: 'text' | 'contained' | 'outlined';
        color?: 'primary' | 'secondary' | 'inherit';
        sx?: SxProps<Theme>;
    };
}

export interface NavbarProps {
    logoSrc?: string;
    logoHeight?: number;
    menuItems?: MenuItemType[];
    containerStyles?: SxProps<Theme>;
    isDrawerOpen: boolean;
    onDrawerToggle: () => void;
    onDrawerClose: () => void;
}

const defaultMenuItems: MenuItemType[] = [
    { text: 'O nas', to: '/about' },
    { text: 'Kontakt', to: '/contact' },
    { text: 'Kursy', to: '/courses' },
    {
        text: 'Zaloguj się',
        to: '/login',
        isButton: true,
        buttonProps: {
            variant: 'contained',
            color: 'secondary',
            sx: {
                px: 3,
                py: 1,
                '&:hover': {
                    backgroundColor: 'secondary.dark',
                }
            }
        }
    }
];

const Navbar: React.FC<NavbarProps> = ({
    logoSrc = logo,
    logoHeight = 100,
    menuItems = defaultMenuItems,
    containerStyles,
    isDrawerOpen,
    onDrawerToggle,
    onDrawerClose,
}) => {
    return (
        <AppBar
            component="nav"
            position="fixed"
            sx={{
                backgroundColor: 'primary.main',
                ...containerStyles,
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <RouterLink to="/">
                    <Box
                        component="img"
                        src={logoSrc}
                        alt="Logo"
                        sx={{
                            height: logoHeight,
                            cursor: 'pointer'
                        }}
                    />
                </RouterLink>

                <Box
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        gap: 3
                    }}
                >
                    {menuItems.map((item) => (
                        item.isButton ? (
                            <Button
                                key={item.text}
                                component={RouterLink}
                                to={item.to}
                                variant={item.buttonProps?.variant || "text"}
                                color={item.buttonProps?.color || "primary"}
                                sx={{
                                    ...item.buttonProps?.sx,
                                    fontSize: '1rem',
                                }}
                            >
                                {item.text}
                            </Button>
                        ) : (
                            <Button
                                key={item.text}
                                component={RouterLink}
                                to={item.to}
                                sx={{
                                    color: 'secondary.main',
                                    fontSize: '1rem',
                                    '&:hover': {
                                        color: 'secondary.dark',
                                        backgroundColor: 'transparent'
                                    }
                                }}
                            >
                                {item.text}
                            </Button>
                        )
                    ))}
                </Box>

                <IconButton
                    edge="end"
                    onClick={onDrawerToggle}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        color: 'secondary.main'
                    }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>

            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={onDrawerClose}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        width: 250,
                        backgroundColor: 'primary.main',
                        mt: '64px'
                    },
                }}
            >
                <List sx={{ p: 2 }}>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                            {item.isButton ? (
                                <Button
                                    component={RouterLink}
                                    to={item.to}
                                    variant={item.buttonProps?.variant || "text"}
                                    color={item.buttonProps?.color || "primary"}
                                    onClick={onDrawerClose}
                                    fullWidth
                                    sx={{
                                        ...item.buttonProps?.sx,
                                        py: 1
                                    }}
                                >
                                    {item.text}
                                </Button>
                            ) : (
                                <ListItemButton
                                    component={RouterLink}
                                    to={item.to}
                                    onClick={onDrawerClose}
                                    sx={{
                                        color: 'secondary.main',
                                        borderRadius: 1,
                                        '&:hover': {
                                            backgroundColor: 'primary.dark'
                                        }
                                    }}
                                >
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{
                                            fontSize: '1rem'
                                        }}
                                    />
                                </ListItemButton>
                            )}
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </AppBar>
    );
};

export default Navbar;