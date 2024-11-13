import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CourseListPage from '../pages/CourseListPage/CourseListPage';
import NotFoundPage from '../pages/404Page/404Page';
import HomePage from '../pages/HomePage/HomePage';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/courses" element={<CourseListPage />} />
                <Route path="*" element={<NotFoundPage
                    title={'404 Not Found'}
                    message={'Oops, the page you\'re looking for doesn\'t exist.'}
                    description={'Please check the URL and try again.'}
                    buttonText={'Go Back Home'}
                    buttonLink={'/'}
                />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;