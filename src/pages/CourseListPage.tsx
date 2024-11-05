import React, { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { CourseCard } from "../components/CourseCard";
import { Box } from "@mui/material";

import courses from "../data/courses.json";

const CourseListPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");

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