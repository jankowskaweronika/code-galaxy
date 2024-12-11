import React from 'react';
import { Container, Box } from '@mui/material';
import SectionHeader from '../components/SectionHeader/SectionHeader';
import SearchBar from '../components/SearchBar/SearchBar';
import GridContainer from '../components/GridContainer/GridContainer';
import CourseCard from '../components/CourseCard/CourseCard';
import { Course, UserCourse, CoursesGridLayoutProps } from '../types/course';

const CoursesGridLayout: React.FC<CoursesGridLayoutProps> = ({
    title,
    subtitle,
    courses,
    searchTerm,
    onSearchChange,
    showProgress = false,
    onPurchase
}) => {
    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isUserCourse = (course: Course | UserCourse): course is UserCourse => {
        return 'purchased' in course;
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <SectionHeader
                title={title}
                subtitle={subtitle}
            />

            <SearchBar
                placeholder="Wyszukaj kurs..."
                value={searchTerm}
                onChange={onSearchChange}
                sx={{ mb: 4 }}
            />

            <Box sx={{ mt: 4 }}>
                <GridContainer>
                    {filteredCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            id={course.id}
                            image={course.imageUrl}
                            name={course.name}
                            price={course.price}
                            description={course.description}
                            purchased={isUserCourse(course) ? course.purchased : undefined}
                            progress={showProgress && isUserCourse(course) ? course.progress : undefined}
                            onPurchase={onPurchase}
                        />
                    ))}
                </GridContainer>
            </Box>
        </Container>
    );
};

export default CoursesGridLayout;