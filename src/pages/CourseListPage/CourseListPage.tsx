import React, { useState } from "react";
import { SearchBar } from "../../components/SearchBar";
import { CourseCard } from "../../components/CourseCard";
import { Box } from "@mui/material";

import defaultCourses from "../../data/courses.json";

interface Course {
    name: string;
    imageUrl: string;
    price: number;
    description: string;
}
interface CourseListPageProps {
    initialCourses?: Course[];
    initialSearchTerm?: string;
}

const CourseListPage: React.FC<CourseListPageProps> = ({ initialCourses, initialSearchTerm = "" }) => {
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

    const courses = initialCourses || defaultCourses;

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box className="container mx-auto py-10">
            <Box className="mb-8">
                <SearchBar
                    placeholder="Wyszukaj kurs..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </Box>

            <Box sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)'
                }
            }}>
                {filteredCourses.map((course) => (
                    <CourseCard
                        key={course.name}
                        image={course.imageUrl}
                        name={course.name}
                        price={course.price}
                        description={course.description}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default CourseListPage;
