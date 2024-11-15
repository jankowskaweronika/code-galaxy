import { useState } from 'react';

export const useNavigation = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setIsDrawerOpen((prev) => !prev);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    return {
        isDrawerOpen,
        handleDrawerToggle,
        handleDrawerClose
    };
};