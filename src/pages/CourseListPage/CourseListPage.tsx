import React, { useState } from "react";
import { Container } from "@mui/material";
import MainLayout from "../../layouts/MainLayout";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import SearchBar from "../../components/SearchBar/SearchBar";
import GridContainer from "../../components/GridContainer/GridContainer";
import CourseCard from "../../components/CourseCard/CourseCard";
import defaultCourses from "../../data/courses.json";

import { CourseListPageProps } from '../../types/course'

const CourseListPage: React.FC<CourseListPageProps> = ({
    initialCourses = defaultCourses,
    initialSearchTerm = ""
}) => {
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

    const filteredCourses = initialCourses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <MainLayout>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <SectionHeader
                    title="Dostępne kursy"
                    subtitle="Przeglądaj i wybierz kursy dopasowane do Twoich potrzeb"
                />

                <SearchBar
                    placeholder="Wyszukaj kurs..."
                    value={searchTerm}
                    onChange={setSearchTerm}
                    sx={{ mb: 4 }}
                />

                <GridContainer>
                    {filteredCourses.map((course) => (
                        <CourseCard
                            key={course.name}
                            image={course.imageUrl}
                            name={course.name}
                            price={course.price}
                            description={course.description}
                        />
                    ))}
                </GridContainer>
            </Container>
        </MainLayout>
    );
};

export default CourseListPage;