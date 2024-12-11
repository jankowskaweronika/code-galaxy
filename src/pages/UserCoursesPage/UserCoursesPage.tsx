import React, { useEffect, useState } from 'react';
import DashboardUserLayout from '../../layouts/DasboardUserLayout';
import CoursesGridLayout from '../../layouts/CoursesGridLayout';
import { useAuth } from '../../auth/authContext';
import { UserCourse } from '../../types/course';
import DashboardNavigation from '../../components/DashboardNavigation/DashboardNavigation';
import courseService from '../../utils/courseService';

const UserCoursesPage: React.FC = () => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [userCourses, setUserCourses] = useState<UserCourse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserCourses = async () => {
            if (!user) return;

            try {
                const courses = await courseService.getUserCourses(user.uid);
                setUserCourses(courses);
            } catch (error) {
                console.error('Error fetching user courses:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserCourses();
    }, [user]);

    const handlePurchase = async (courseId: number) => {
        if (!user) return;

        try {
            await courseService.purchaseCourse(user.uid, courseId);
            // Odśwież listę kursów po zakupie
            const updatedCourses = await courseService.getUserCourses(user.uid);
            setUserCourses(updatedCourses);
        } catch (error) {
            console.error('Error purchasing course:', error);
            throw error;
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <DashboardUserLayout
            drawer={<DashboardNavigation />}
            title="Twoje kursy"
        >
            <CoursesGridLayout
                title="Twoje kursy"
                subtitle="Zobacz swoje kursy i postępy w nauce"
                courses={userCourses}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                showProgress={true}
                onPurchase={handlePurchase}
            />
        </DashboardUserLayout>
    );
};

export default UserCoursesPage;