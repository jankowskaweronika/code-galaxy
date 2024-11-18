import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { MenuItemType, NavbarProps } from '../Navbar/Navbar';

const StyledList = styled(List)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.up('sm')]: {
        display: 'flex',
    },
}));

export type DesktopMenuProps = {
    menuItems: MenuItemType[];
    menuItemStyles?: NavbarProps['menuItemStyles'];
};

const DesktopMenu: React.FC<DesktopMenuProps> = ({ menuItems, menuItemStyles }) => (
    <StyledList>
        {menuItems.map((item) => (
            <ListItem key={item.text}>
                <ListItemButton
                    component={Link}
                    to={item.to}
                    sx={{
                        color: menuItemStyles?.color || ((theme) => theme.palette.background.default),
                        backgroundColor: menuItemStyles?.backgroundColor || "transparent",
                        "&:hover": {
                            backgroundColor: menuItemStyles?.hoverBackgroundColor || "transparent",
                            color: menuItemStyles?.hoverColor || ((theme) => theme.palette.secondary.main),
                        },
                    }}
                >
                    <ListItemText primary={item.text} />
                </ListItemButton>
            </ListItem>
        ))}
    </StyledList>
);

export default DesktopMenu