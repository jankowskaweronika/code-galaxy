import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../auth/authContext';
import { ProtectedRoute } from '../auth/protectedRoute';

import CourseListPage from '../pages/CourseListPage/CourseListPage';
import NotFoundPage from '../pages/404Page/404Page';
import HomePage from '../pages/HomePage/HomePage';
import AboutUsPage from '../pages/AboutUsPage/AboutUsPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import DashboardCourseList from '../pages/DashboardUserCoursesList/DashboardUserCoursesList';
import PurchasedCoursesPage from '../pages/PurchasedDashboardCoursesPage/PurchasedDashboardCoursesPage';
import ContactPage from '../pages/ContactPage/ContactPage';
import DashboardUserProfilePage from '../pages/DashboardUserProfilePage/DashboardUserProfilePage';
import DashboardSettingsPage from '../pages/DashboardSettingsPage/DashboardSettingsPage';
import CoursePage from '../pages/CoursePage/CoursePage';
import LessonPage from '../pages/LessonPage/LessonPage';

const Router: React.FC = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/courses" element={<CourseListPage />} />
                    <Route path="/about" element={<AboutUsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/contact" element={<ContactPage />} />

                    <Route path="/dashboard" element={<ProtectedRoute />}>
                        <Route index element={<DashboardUserProfilePage />} />
                        <Route path="courses" element={<DashboardCourseList />} />
                        <Route path="progress" element={<PurchasedCoursesPage />} />
                        <Route path="settings" element={<DashboardSettingsPage />} />
                        <Route path="course/:courseId" element={<CoursePage />} />
                        <Route path="course/:courseId/lesson/:lessonId" element={<LessonPage />} />
                    </Route>

                    <Route path="*" element={
                        <NotFoundPage
                            title={'Ta strona nie istnieje'}
                            message={'Sprawdź czy adres strony jest poprawny'}
                            buttonText={'Wróć na stronę główną'}
                            buttonLink={'/'}
                        />
                    } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default Router;