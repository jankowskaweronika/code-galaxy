import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import ButtonMUI from './Button';

const meta = {
    title: 'Components/ButtonMUI',
    component: ButtonMUI,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['contained', 'outlined', 'text'],
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
        },
        children: {
            control: 'text',
        },
    },
} satisfies Meta<typeof ButtonMUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: 'contained',
        color: 'primary',
        size: 'medium',
        children: 'Primary ButtonMUI',
        onClick: fn(),
    },
};

export const Secondary: Story = {
    args: {
        variant: 'outlined',
        color: 'secondary',
        size: 'medium',
        children: 'Secondary ButtonMUI',
        onClick: fn(),
    },
};

export const Small: Story = {
    args: {
        variant: 'contained',
        size: 'small',
        children: 'Small ButtonMUI',
        onClick: fn(),
    },
};

export const Large: Story = {
    args: {
        variant: 'contained',
        size: 'large',
        children: 'Large ButtonMUI',
        onClick: fn(),
    },
};