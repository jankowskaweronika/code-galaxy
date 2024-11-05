import type { Meta, StoryObj } from '@storybook/react';
import SearchBar from './SearchBar';
import SearchIcon from '@mui/icons-material/Search';
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const meta: Meta<typeof SearchBar> = {
    title: 'Components/SearchBar',
    component: SearchBar,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Story />
            </ThemeProvider>
        ),
    ],
    argTypes: {
        icon: {
            defaultValue: SearchIcon,
            table: {
                type: { summary: 'SvgIconComponent' }
            }
        },
        value: { control: 'text' },
        placeholder: { control: 'text' },
        onChange: { action: 'changed' },
        className: { control: 'text' },
    }
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
    args: {
        icon: SearchIcon,
        placeholder: 'Search',
        value: '',
        className: ''
    }
};

export const WithValue: Story = {
    args: {
        ...Default.args,
        value: 'Example search text'
    }
};

export const CustomPlaceholder: Story = {
    args: {
        ...Default.args,
        placeholder: 'Wyszukaj kurs...'
    }
};

export const CustomWidth: Story = {
    args: {
        ...Default.args,
        className: 'max-w-md'
    }
};