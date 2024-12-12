import React, { useEffect, useState } from 'react';
import { UserCourse } from '../../types/course';
import courseService from '../../utils/courseService';
import { useAuth } from '../../auth/authContext';
import CoursesGridLayout from '../../layouts/CoursesGridLayout';
import DashboardUserLayout from '../../layouts/DasboardUserLayout';
import DashboardNavigation from '../../components/DashboardNavigation/DashboardNavigation';

const PurchasedDashboardCoursesPage: React.FC = () => {
    const { user } = useAuth();
    const [purchasedCourses, setPurchasedCourses] = useState<UserCourse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (user) {
            fetchPurchasedCourses();
        }
    }, [user]);

    const fetchPurchasedCourses = async () => {
        if (!user) return;

        try {
            const courses = await courseService.getUserPurchasedCourses(user.uid);
            setPurchasedCourses(courses);
        } catch (error) {
            console.error('Błąd z pobieraniem zakupionych kursów:', error);
        } finally {
            setIsLoading(false);
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
                title="Twoje kursy"
                subtitle="Lista Twoich zakupionych kursów"
                courses={purchasedCourses}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                showProgress={true}
            />
        </DashboardUserLayout>
    );
};

export default PurchasedDashboardCoursesPage;