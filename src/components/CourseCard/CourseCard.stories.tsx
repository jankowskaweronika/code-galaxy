import type { Meta, StoryObj } from '@storybook/react';
import CourseCard from './CourseCard';

import logo from '../../assets/logo.png'

const meta: Meta<typeof CourseCard> = {
    title: 'Components/CourseCard',
    component: CourseCard,
    tags: ['autodocs'],
    argTypes: {
        image: { control: 'text' },
        name: { control: 'text' },
        price: { control: 'number' },
        description: { control: 'text' },
        disabled: { control: 'boolean' }
    }
};

export default meta;

type Story = StoryObj<typeof CourseCard>;

export const Default: Story = {
    args: {
        image: logo,
        name: 'CodeRoad',
        price: 79.00,
        description: 'Kompleksowy kurs programowania!',
        disabled: true
    }
};

export const Enabled: Story = {
    args: {
        ...Default.args,
        disabled: false
    }
};