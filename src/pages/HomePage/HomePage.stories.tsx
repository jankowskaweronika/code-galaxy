import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';
import theme from '../../theme/theme';

const HomePageWrapper = (props: any) => (
    <MemoryRouter>
        <ThemeProvider theme={theme}>
            <div>
                <HomePage {...props} />
            </div>
        </ThemeProvider>
    </MemoryRouter>
);

const meta = {
    title: 'Pages/HomePage',
    component: HomePageWrapper,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: '100%' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const WithCustomBackground: Story = {
    args: {},
    decorators: [
        (Story) => (
            <div style={{ background: '#FFC0CB', padding: '2rem' }}>
                <Story />
            </div>
        ),
    ],
};

