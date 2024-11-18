import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import theme from '../../theme/theme';
import Logo from '../../assets/logo.png';

const NavbarWrapper = (props: any) => (
    <MemoryRouter>
        <ThemeProvider theme={theme}>
            <div style={{ minHeight: '100vh' }}>
                <Navbar {...props} />
            </div>
        </ThemeProvider>
    </MemoryRouter>
);

const meta = {
    title: 'Navigation/Navbar',
    component: NavbarWrapper,
    parameters: {
        layout: 'fullscreen',
        viewport: {
            defaultViewport: 'responsive',
        },
    },
    tags: ['autodocs'],
    argTypes: {
        onDrawerToggle: { action: 'drawer toggled' },
        onDrawerClose: { action: 'drawer closed' },
        logoSrc: { control: 'text' },
        logoHeight: { control: 'number' },
    },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultMenuItems = [
    { text: 'O nas', to: '/about' },
    { text: 'Kontakt', to: '/contact' },
    { text: 'Kursy', to: '/courses' },
];

export const Default: Story = {
    args: {
        logoSrc: Logo,
        logoHeight: 30,
        menuItems: defaultMenuItems,
        isDrawerOpen: false,
        menuItemStyles: {
            color: theme.palette.background.default,
            hoverColor: theme.palette.secondary.main,
        },
    },
};

export const CustomStyled: Story = {
    args: {
        logoSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjQZ7BIYzVIzZqK2IZwZS-dKYDCmqxeenFBw&s',
        logoHeight: 50,
        menuItems: defaultMenuItems,
        isDrawerOpen: false,
        menuItemStyles: {
            color: theme.palette.background.default,
            hoverColor: theme.palette.secondary.main,
            backgroundColor: theme.palette.primary.main,
            hoverBackgroundColor: theme.palette.secondary.main,
        },
        containerStyles: {
            backgroundColor: theme.palette.secondary.main,
        },
    },
};

export const ManyMenuItems: Story = {
    args: {
        ...Default.args,
        menuItems: [
            { text: 'Home', to: '/' },
            { text: 'About', to: '/about' },
            { text: 'Services', to: '/services' },
            { text: 'Products', to: '/products' },
            { text: 'Blog', to: '/blog' },
            { text: 'Contact', to: '/contact' },
            { text: 'FAQ', to: '/faq' },
        ],
    },
};

export const Minimal: Story = {
    args: {
        logoSrc: Logo,
        logoHeight: 20,
        menuItems: [{ text: 'Home', to: '/' }],
        isDrawerOpen: false,
    },
};

export const DifferentLogoSizes: Story = {
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <NavbarWrapper {...args} logoHeight={20} />
            <NavbarWrapper {...args} logoHeight={40} />
            <NavbarWrapper {...args} logoHeight={60} />
        </div>
    ),
    args: {
        ...Default.args,
    },
};