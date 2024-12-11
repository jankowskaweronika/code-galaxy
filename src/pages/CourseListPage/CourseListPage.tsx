import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import CoursesGridLayout from "../../layouts/CoursesGridLayout";
import { Course } from "../../types/course";
import courseService from "../../utils/courseService";
import { useAuth } from "../../auth/authContext";

const CourseListPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const coursesData = await courseService.getAllCourses();
                setCourses(coursesData);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handlePurchase = async (courseId: number) => {
        if (!user) return;

        try {
            await courseService.purchaseCourse(user.uid, courseId);
        } catch (error) {
            console.error('Error purchasing course:', error);
            throw error;
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <MainLayout>
            <CoursesGridLayout
                title="Dostępne kursy"
                subtitle="Przeglądaj i wybierz kursy dopasowane do Twoich potrzeb"
                courses={courses}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onPurchase={handlePurchase}
            />
        </MainLayout>
    );
};

export default CourseListPage;