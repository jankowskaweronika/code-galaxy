import React from 'react';
import { Drawer, Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { MenuItemType, NavbarProps } from './Navbar';

type MobileMenuProps = {
    isOpen: boolean;
    onClose: () => void;
    menuItems: MenuItemType[];
    menuItemStyles?: NavbarProps['menuItemStyles'];
};

const MobileMenu: React.FC<MobileMenuProps> = ({
    isOpen,
    onClose,
    menuItems,
    menuItemStyles,
}) => (
    <Drawer
        anchor="right"
        open={isOpen}
        onClose={onClose}
        sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 250,
            },
        }}
    >
        <Box sx={{ width: 250, p: 2 }}>
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            component={Link}
                            to={item.to}
                            onClick={onClose}
                            sx={{
                                color: menuItemStyles?.color || 'text.primary',
                                '&:hover': {
                                    backgroundColor: menuItemStyles?.hoverBackgroundColor || 'action.hover',
                                    color: menuItemStyles?.hoverColor || 'primary.main',
                                },
                            }}
                        >
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    </Drawer>
);

export default MobileMenu