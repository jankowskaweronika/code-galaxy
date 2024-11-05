import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CourseListPage from '../pages/CourseListPage/CourseListPage';
import NotFoundPage from '../pages/404Page/404Page';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/courses" replace />} />
                <Route path="/courses" element={<CourseListPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;