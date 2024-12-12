import React, { useState, useEffect } from 'react';
import { Course } from '../../types/course';
import courseService from '../../utils/courseService';
import { useAuth } from '../../auth/authContext';
import CoursesGridLayout from '../../layouts/CoursesGridLayout';
import { Snackbar, Alert, CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardUserLayout from '../../layouts/DasboardUserLayout';
import DashboardNavigation from '../../components/DashboardNavigation/DashboardNavigation';

const DashboardUserCoursesList: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [isPurchasing, setIsPurchasing] = useState(false);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const coursesData = await courseService.getAllCourses();
            setCourses(coursesData);
        } catch (error) {
            console.error('Nie udało się załadować kursów:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePurchase = async (courseId: number) => {
        if (!user || isPurchasing) return;

        setIsPurchasing(true);
        try {
            await courseService.purchaseCourse(user.uid, courseId);
            setShowSuccessAlert(true);

            setTimeout(() => {
                setShowSuccessAlert(false);
                navigate('/dashboard/progress');
            }, 2000);
        } catch (error) {
            console.error('Nie udało się zakupić kursu:', error);
        } finally {
            setIsPurchasing(false);
        }
    };

    if (isLoading) {
        return (
            <DashboardUserLayout drawer={<DashboardNavigation />}>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                    <CircularProgress />
                </Box>
            </DashboardUserLayout>
        );
    }

    return (
        <DashboardUserLayout drawer={<DashboardNavigation />}>
            <CoursesGridLayout
                title="Dostępne kursy"
                subtitle="Wybierz kurs dla siebie"
                courses={courses}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onPurchase={handlePurchase}
            />

            <Snackbar
                open={showSuccessAlert}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    elevation={6}
                    variant="filled"
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    Twój kurs został zakupiony!
                </Alert>
            </Snackbar>
        </DashboardUserLayout>
    );
};

export default DashboardUserCoursesList;