import React, { useEffect, useState } from 'react';
import DashboardUserLayout from '../../layouts/DasboardUserLayout';
import CoursesGridLayout from '../../layouts/CoursesGridLayout';
import { useAuth } from '../../auth/authContext';
import defaultCourses from '../../data/courses.json';
import { Course, UserCourse } from '../../types/course';
import DashboardNavigation from '../../components/DashboardNavigation/DashboardNavigation';

const UserCoursesPage: React.FC = () => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [userCourses, setUserCourses] = useState<UserCourse[]>([]);

    useEffect(() => {
        const purchasedCourseIds = [1, 3];

        const coursesWithPurchaseStatus: UserCourse[] = (defaultCourses as Course[]).map(course => ({
            ...course,
            purchased: purchasedCourseIds.includes(course.id),
            progress: purchasedCourseIds.includes(course.id)
                ? Math.floor(Math.random() * 100)
                : undefined
        }));

        setUserCourses(coursesWithPurchaseStatus);
    }, [user]);

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
            />
        </DashboardUserLayout>
    );
};

export default UserCoursesPage;