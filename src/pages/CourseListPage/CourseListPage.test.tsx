import { render, screen, fireEvent } from "@testing-library/react";
import CourseListPage from "./CourseListPage";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";

const testCourses = [
    {
        id: 1,
        name: "Wprowadzenie do programowania w Python",
        description: "Podstawy języka Python, zmienne, typy danych, kontrola przepływu, funkcje.",
        imageUrl: "https://picsum.photos/id/1/400/225",
        price: 100,
    },
    {
        id: 2,
        name: "Tworzenie aplikacji webowych w React.js",
        description: "Nauka komponentów, state, props, hooks, routing, zarządzanie stanem.",
        imageUrl: "https://picsum.photos/id/2/400/225",
        price: 150,
    },
    {
        id: 3,
        name: "Podstawy baz danych SQL",
        description: "Projektowanie baz danych, zapytania SQL, zarządzanie danymi.",
        imageUrl: "https://picsum.photos/id/3/400/225",
        price: 120,
    },
];

describe("CourseListPage", () => {
    it("should render all courses by default", () => {
        render(<CourseListPage initialCourses={testCourses} />);

        testCourses.forEach((course) => {
            expect(screen.getByText(course.name)).toBeInTheDocument();
            expect(screen.getByText(course.description)).toBeInTheDocument();
        });
    });

    it("should filter courses based on search term", () => {
        render(<CourseListPage initialCourses={testCourses} />);

        const searchBar = screen.getByPlaceholderText("Wyszukaj kurs...");
        fireEvent.change(searchBar, { target: { value: "Python" } });

        expect(screen.getByText("Wprowadzenie do programowania w Python")).toBeInTheDocument();
        expect(screen.queryByText("Tworzenie aplikacji webowych w React.js")).not.toBeInTheDocument();
        expect(screen.queryByText("Podstawy baz danych SQL")).not.toBeInTheDocument();
    });

    it("should show all courses again if search term is cleared", () => {
        render(<CourseListPage initialCourses={testCourses} />);

        const searchBar = screen.getByPlaceholderText("Wyszukaj kurs...");
        fireEvent.change(searchBar, { target: { value: "Python" } });

        expect(screen.getByText("Wprowadzenie do programowania w Python")).toBeInTheDocument();
        expect(screen.queryByText("Tworzenie aplikacji webowych w React.js")).not.toBeInTheDocument();

        fireEvent.change(searchBar, { target: { value: "" } });

        testCourses.forEach((course) => {
            expect(screen.getByText(course.name)).toBeInTheDocument();
        });
    });

    it("should display initial search term if provided", () => {
        render(<CourseListPage initialCourses={testCourses} initialSearchTerm="SQL" />);

        expect(screen.getByPlaceholderText("Wyszukaj kurs...")).toHaveValue("SQL");
        expect(screen.getByText("Podstawy baz danych SQL")).toBeInTheDocument();
        expect(screen.queryByText("Wprowadzenie do programowania w Python")).not.toBeInTheDocument();
    });

    it("should call the handleSearch function on search input change", () => {
        render(<CourseListPage initialCourses={testCourses} />);

        const searchBar = screen.getByPlaceholderText("Wyszukaj kurs...");
        fireEvent.change(searchBar, { target: { value: "React" } });

        expect(screen.getByText("Tworzenie aplikacji webowych w React.js")).toBeInTheDocument();
        expect(screen.queryByText("Wprowadzenie do programowania w Python")).not.toBeInTheDocument();
    });
});
