import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigation } from '../../hooks/useNavigation';

const HomePage: React.FC = () => {
    const { isDrawerOpen, handleDrawerToggle, handleDrawerClose } = useNavigation();

    return (
        <div>
            <Navbar
                isDrawerOpen={isDrawerOpen}
                onDrawerToggle={handleDrawerToggle}
                onDrawerClose={handleDrawerClose}
            />
        </div>
    );
};

export default HomePage