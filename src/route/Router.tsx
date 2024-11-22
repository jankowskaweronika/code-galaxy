import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CourseListPage from '../pages/CourseListPage/CourseListPage';
import NotFoundPage from '../pages/404Page/404Page';
import HomePage from '../pages/HomePage/HomePage';
import AboutUsPage from '../pages/AboutUsPage/AboutUsPage';
import LoginPage from '../pages/LoginPage/LoginPage';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/courses" element={<CourseListPage />} />
                <Route path='/about' element={<AboutUsPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage
                    title={'Ta strona nie istnieje'}
                    message={'Sprawdź czy adres strony jest poprawny'}
                    buttonText={'Wróć na stronę główną'}
                    buttonLink={'/'}
                />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;