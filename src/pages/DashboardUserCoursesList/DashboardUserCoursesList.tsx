import React, { useState, useEffect } from 'react';
import { Course } from '../../types/course';
import courseService from '../../utils/courseService';
import { useAuth } from '../../auth/authContext';
import CoursesGridLayout from '../../layouts/CoursesGridLayout';
import { Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardUserLayout from '../../layouts/DasboardUserLayout';
import DashboardNavigation from '../../components/DashboardNavigation/DashboardNavigation';

const DashboardUserCoursesList: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const coursesData = await courseService.getAllCourses();
            setCourses(coursesData);
        } catch (error) {
            setMessage({ type: 'error', text: 'Nie udało się załadować kursów' });
        } finally {
            setIsLoading(false);
        }
    };

    const handlePurchase = async (courseId: number) => {
        if (!user) return;

        try {
            await courseService.purchaseCourse(user.uid, courseId);
            setMessage({ type: 'success', text: 'Kurs został pomyślnie zakupiony!' });
            setTimeout(() => {
                navigate('/dashboard/progress');
            }, 1500);
        } catch (error) {
            setMessage({ type: 'error', text: 'Nie udało się zakupić kursu' });
        }
    };

    if (isLoading) {
        return <DashboardUserLayout drawer={<DashboardNavigation />}>
            <div>Loading...</div>
        </DashboardUserLayout>;
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
                open={!!message}
                autoHideDuration={6000}
                onClose={() => setMessage(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity={message?.type || 'info'}
                    onClose={() => setMessage(null)}
                >
                    {message?.text}
                </Alert>
            </Snackbar>
        </DashboardUserLayout>
    );
};

export default DashboardUserCoursesList;