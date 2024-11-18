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
        title: 'Ta strona nie istnieje',
        message: 'Sprawdź czy adres strony jest poprawny',
        buttonText: 'Wróć na stronę główną',
        buttonLink: '/',
    },
};

export const CustomTitle: Story = {
    args: {
        title: '404',
        message: 'Sprawdź czy adres strony jest poprawny',
        buttonText: 'Wróć na stronę główną',
        buttonLink: '/',
    },
};

export const CustomMessage: Story = {
    args: {
        title: 'Ta strona nie istnieje',
        message: 'Ups, wystąpił błąd...',
        buttonText: 'Wróć na stronę główną',
        buttonLink: '/',
    },
};

export const CustomButton: Story = {
    args: {
        title: 'Ta strona nie istnieje',
        message: 'Sprawdź czy adres strony jest poprawny',
        buttonText: 'Powrót do domu',
        buttonLink: '/',
    },
};