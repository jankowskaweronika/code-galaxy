import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material';
import { MemoryRouter } from 'react-router-dom';
import DesktopMenu from './DesktopMenu';
import theme from '../../theme/theme';

const DesktopMenuWrapper = (props: any) => (
    <MemoryRouter>
        <ThemeProvider theme={theme}>
            <div style={{ backgroundColor: theme.palette.primary.main }}>
                <DesktopMenu {...props} />
            </div>
        </ThemeProvider>
    </MemoryRouter>
);

const meta = {
    title: 'Navigation/DesktopMenu',
    component: DesktopMenuWrapper,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: '600px' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof DesktopMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultMenuItems = [
    { text: 'O nas', to: '/about' },
    { text: 'Kontakt', to: '/contact' },
    { text: 'Kursy', to: '/course' },
];

export const Default: Story = {
    args: {
        menuItems: defaultMenuItems,
        menuItemStyles: {
            color: theme.palette.background.default,
            hoverColor: theme.palette.secondary.main,
        },
    },
};

export const AlternativeStyle: Story = {
    args: {
        menuItems: defaultMenuItems,
        menuItemStyles: {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.secondary.main,
            hoverColor: theme.palette.background.default,
            hoverBackgroundColor: theme.palette.primary.main
        },
    },
};

export const ManyItems: Story = {
    args: {
        menuItems: [
            { text: 'Home', to: '/' },
            { text: 'About', to: '/about' },
            { text: 'Services', to: '/services' },
            { text: 'Products', to: '/products' },
            { text: 'Blog', to: '/blog' }
        ],
        menuItemStyles: {
            color: theme.palette.background.default,
            hoverColor: theme.palette.secondary.main,
        },
    },
};

export const SingleItem: Story = {
    args: {
        menuItems: [{ text: 'Home', to: '/' }],
        menuItemStyles: {
            color: theme.palette.background.default,
            hoverColor: theme.palette.secondary.main,
        },
    },
};