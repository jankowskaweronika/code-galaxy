import {
    AppBar,
    Toolbar,
    Box,
    List,
    ListItem,
    styled,
    ListItemButton,
    ListItemText,
    SxProps,
    Theme
} from "@mui/material";
import logo from "../../assets/logo.png"
import { Link } from "react-router-dom";

export type MenuItemType = {
    text: string;
    to: string;
}

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
}

export const defaultProps: Pick<NavbarProps, 'logoHeight' | 'menuItems'> = {
    logoHeight: 30,
    menuItems: [
        {
            text: "About",
            to: "/about",
        },
        {
            text: "Contact",
            to: "/contact",
        },
        {
            text: "Kursy",
            to: "/courses"
        }
    ]
};

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
});

const ListMenu = styled(List)(({ theme }) => ({
    display: "none",
    [theme.breakpoints.up("sm")]: {
        display: "flex",
    },
}));


const Navbar: React.FC<NavbarProps> = ({
    logoSrc = logo,
    logoHeight = defaultProps.logoHeight,
    menuItems = defaultProps.menuItems,
    containerStyles,
    menuItemStyles
}) => {
    return (
        <AppBar
            component="nav"
            position="absolute"
            sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
                ...containerStyles
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
                <Box sx={{ display: { xs: "block", sm: "none" } }} />
                <ListMenu>
                    {(menuItems || []).map((item) => (
                        <ListItem key={item.text}>
                            <ListItemButton
                                component={Link}
                                to={item.to}
                                sx={{
                                    color: menuItemStyles?.color || ((theme) => theme.palette.background.default),
                                    backgroundColor: menuItemStyles?.backgroundColor || 'transparent',
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
                </ListMenu>
            </StyledToolbar>
        </AppBar>
    );
};

export default Navbar;