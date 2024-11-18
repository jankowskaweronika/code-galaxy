import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material';
import { MemoryRouter } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import theme from '../../theme/theme'

const MobileMenuWrapper = (props: any) => (
    <MemoryRouter>
        <ThemeProvider theme={theme}>
            <MobileMenu {...props} />
        </ThemeProvider>
    </MemoryRouter>
);

const meta = {
    title: 'Navigation/MobileMenu',
    component: MobileMenuWrapper,
    parameters: {
        layout: 'fullscreen',
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: '600px' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof MobileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultMenuItems = [
    { text: 'Home', to: '/' },
    { text: 'About', to: '/about' },
    { text: 'Contact', to: '/contact' },
];

export const Default: Story = {
    args: {
        isOpen: true,
        menuItems: defaultMenuItems,
        menuItemStyles: {
            color: theme.palette.secondary.main,
            hoverColor: theme.palette.secondary.main,
            hoverBackgroundColor: theme.palette.primary.main,
        },
    },
};

export const ManyItems: Story = {
    args: {
        isOpen: true,
        menuItems: [
            { text: 'Home', to: '/' },
            { text: 'About', to: '/about' },
            { text: 'Services', to: '/services' },
            { text: 'Products', to: '/products' },
            { text: 'Blog', to: '/blog' },
            { text: 'Contact', to: '/contact' },
            { text: 'FAQ', to: '/faq' },
        ],
        menuItemStyles: {
            color: theme.palette.secondary.main,
            hoverColor: theme.palette.secondary.main,
            hoverBackgroundColor: theme.palette.primary.main,
        },
    },
};

export const AlternativeStyle: Story = {
    args: {
        isOpen: true,
        menuItems: defaultMenuItems,
        menuItemStyles: {
            hoverColor: theme.palette.background.default,
        },
    },
};

export const SingleItem: Story = {
    args: {
        isOpen: true,
        menuItems: [{ text: 'Home', to: '/' }],
        menuItemStyles: {
            color: theme.palette.secondary.main,
            hoverColor: theme.palette.secondary.main,
            hoverBackgroundColor: theme.palette.primary.main,
        },
    },
};