import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from './404Page';

const meta: Meta<typeof NotFoundPage> = {
    title: 'Pages/SimpleNotFoundPage',
    component: NotFoundPage,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

type Story = StoryObj<typeof NotFoundPage>;

export const Default: Story = {
    args: {
        title: '404',
        message: 'Oops! Strona nie została znaleziona.',
        description: 'Przepraszamy, ale strona, której szukasz, nie istnieje.',
        buttonText: 'Wróć na stronę główną',
        buttonLink: '/',
    },
};

export const CustomTitle: Story = {
    args: {
        title: '401',
        message: 'Oops! Strona nie została znaleziona.',
        description: 'Przepraszamy, ale strona, której szukasz, nie istnieje.',
        buttonText: 'Wróć na stronę główną',
        buttonLink: '/',
    },
};

export const CustomMessage: Story = {
    args: {
        title: '404',
        message: 'Ups, wystąpił błąd...',
        description: 'Przepraszamy, ale strona, której szukasz, nie istnieje.',
        buttonText: 'Wróć na stronę główną',
        buttonLink: '/',
    },
};

export const CustomDescription: Story = {
    args: {
        title: '404',
        message: 'Oops! Strona nie została znaleziona.',
        description: 'Niestety, nie możemy wyświetlić tej strony w tym momencie.',
        buttonText: 'Wróć na stronę główną',
        buttonLink: '/',
    },
};

export const CustomButton: Story = {
    args: {
        title: '404',
        message: 'Oops! Strona nie została znaleziona.',
        description: 'Przepraszamy, ale strona, której szukasz, nie istnieje.',
        buttonText: 'Powrót do domu',
        buttonLink: '/',
    },
};