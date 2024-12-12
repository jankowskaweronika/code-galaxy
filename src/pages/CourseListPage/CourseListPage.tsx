import React, { useState, useEffect } from "react";
import { Course } from "../../types/course";
import courseService from "../../utils/courseService";
import { useAuth } from "../../auth/authContext";
import CoursesGridLayout from "../../layouts/CoursesGridLayout";
import { Snackbar, Alert, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainLayout from "../../layouts/MainLayout";

const CourseListPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [alert, setAlert] = useState<{ open: boolean; message: string; type: 'success' | 'error' }>({
        open: false,
        message: '',
        type: 'success'
    });

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
        if (!user) {
            setAlert({
                open: true,
                message: 'Musisz być zalogowany, aby kupić kurs',
                type: 'error'
            });
            return;
        }

        try {
            await courseService.purchaseCourse(user.uid, courseId);
            setAlert({
                open: true,
                message: 'Kurs został pomyślnie zakupiony!',
                type: 'success'
            });
            setTimeout(() => navigate('/dashboard/progress'), 1500);
        } catch (error) {
            setAlert({
                open: true,
                message: 'Wystąpił błąd podczas zakupu kursu',
                type: 'error'
            });
        }
    };

    if (isLoading) {
        return <MainLayout>
            <div>Loading...</div>
        </MainLayout>;
    }

    return (
        <MainLayout>
            <Box sx={{
                minHeight: 'calc(100vh - 64px)',
                overflowY: 'auto',
                overflowX: 'hidden'
            }}>
                <CoursesGridLayout
                    title="Dostępne kursy"
                    subtitle="Przeglądaj i wybierz kursy dopasowane do Twoich potrzeb"
                    courses={courses}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onPurchase={handlePurchase}
                />
                <Snackbar
                    open={alert.open}
                    autoHideDuration={6000}
                    onClose={() => setAlert({ ...alert, open: false })}
                >
                    <Alert severity={alert.type} onClose={() => setAlert({ ...alert, open: false })}>
                        {alert.message}
                    </Alert>
                </Snackbar>
            </Box>
        </MainLayout>
    );
};

export default CourseListPage;