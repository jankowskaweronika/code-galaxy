import { Meta, StoryObj } from "@storybook/react";
import CourseListPage from "./CourseListPage"

const mockCourses = {
    typical: [
        {
            name: "JavaScript Basics",
            imageUrl: "https://picsum.photos/id/1/400/225",
            price: 199.99,
            description: "Learn the fundamentals of JavaScript programming"
        }
    ],
    empty: [],
    longContent: [
        {
            name: "Very Very Very Long Course Name That Might Break UI",
            imageUrl: "https://picsum.photos/id/2/400/225",
            price: 999.99,
            description: "This is a very long description that might cause issues with wrapping and might need to be handled properly in the UI to ensure it doesn't break the layout of our course cards. We need to make sure this works correctly."
        }
    ],
    specialCharacters: [
        {
            name: "React & Next.js 🚀",
            imageUrl: "https://picsum.photos/id/3/400/225",
            price: 299.99,
            description: "Special characters test: &<>\"'🎉"
        }
    ],
    multiple: [
        {
            name: "JavaScript Basics",
            imageUrl: "https://picsum.photos/id/3/400/225",
            price: 199.99,
            description: "Learn the fundamentals of JavaScript programming"
        },
        {
            name: "React Fundamentals",
            imageUrl: "https://picsum.photos/id/3/400/225",
            price: 299.99,
            description: "Master React basics and core concepts"
        },
        {
            name: "TypeScript Advanced",
            imageUrl: "https://picsum.photos/id/3/400/225",
            price: 399.99,
            description: "Advanced TypeScript programming techniques"
        }
    ]
};

const meta: Meta<typeof CourseListPage> = {
    title: "Pages/CourseListPage",
    component: CourseListPage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    }
};

export default meta;

type Story = StoryObj<typeof CourseListPage>;

export const Default: Story = {
    args: {
        initialCourses: mockCourses.typical,
        initialSearchTerm: ""
    }
};

export const MultipleCourses: Story = {
    args: {
        initialCourses: mockCourses.multiple,
        initialSearchTerm: ""
    }
};

export const LongContent: Story = {
    args: {
        initialCourses: mockCourses.longContent,
        initialSearchTerm: ""
    }
};

export const SpecialCharacters: Story = {
    args: {
        initialCourses: mockCourses.specialCharacters,
        initialSearchTerm: ""
    }
};

export const EmptyState: Story = {
    args: {
        initialCourses: mockCourses.empty,
        initialSearchTerm: ""
    }
};

export const WithSearchTerm: Story = {
    args: {
        initialCourses: mockCourses.multiple,
        initialSearchTerm: "JavaScript"
    }
};
