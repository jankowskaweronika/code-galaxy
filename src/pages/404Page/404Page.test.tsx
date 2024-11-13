import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from "vitest";
import { BrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';
import { JSX } from 'react/jsx-runtime';

import "@testing-library/jest-dom";

import NotFoundPage from './404Page';

const renderWithRouter = (component: string | number | boolean | Iterable<ReactNode> | JSX.Element | null | undefined) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('NotFoundPage', () => {
    it('should render the correct title', () => {
        renderWithRouter(
            <NotFoundPage
                title="404 Not Found"
                message="Oops, the page you're looking for doesn't exist."
                description="The page you requested could not be found. Please check the URL and try again."
                buttonText="Go Back Home"
                buttonLink="/"
            />
        );

        expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    });

    it('should render the correct message', () => {
        renderWithRouter(
            <NotFoundPage
                title="404 Not Found"
                message="Oops, the page you're looking for doesn't exist."
                description="The page you requested could not be found. Please check the URL and try again."
                buttonText="Go Back Home"
                buttonLink="/"
            />
        );

        expect(screen.getByText('Oops, the page you\'re looking for doesn\'t exist.')).toBeInTheDocument();
    });

    it('should render the correct description', () => {
        renderWithRouter(
            <NotFoundPage
                title="404 Not Found"
                message="Oops, the page you're looking for doesn't exist."
                description="The page you requested could not be found. Please check the URL and try again."
                buttonText="Go Back Home"
                buttonLink="/"
            />
        );

        expect(screen.getByText('The page you requested could not be found. Please check the URL and try again.')).toBeInTheDocument();
    });

    it('should render the correct button text and link', () => {
        renderWithRouter(
            <NotFoundPage
                title="404 Not Found"
                message="Oops, the page you're looking for doesn't exist."
                description="The page you requested could not be found. Please check the URL and try again."
                buttonText="Go Back Home"
                buttonLink="/"
            />
        );

        const link = screen.getByText('Go Back Home');
        expect(link).toHaveAttribute('href', '/');

        fireEvent.click(link);
        expect(window.location.pathname).toBe('/');
    });
});