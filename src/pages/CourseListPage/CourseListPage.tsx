import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import CoursesGridLayout from "../../layouts/CoursesGridLayout";
import defaultCourses from "../../data/courses.json";
import { Course } from "../../types/course";

const CourseListPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <MainLayout>
            <CoursesGridLayout
                title="Dostępne kursy"
                subtitle="Przeglądaj i wybierz kursy dopasowane do Twoich potrzeb"
                courses={defaultCourses as Course[]}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />
        </MainLayout>
    );
};

export default CourseListPage;